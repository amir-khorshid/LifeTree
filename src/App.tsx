import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  BaseEdge,
  Handle,
  Position,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
  type ReactFlowInstance,
} from '@xyflow/react';
import { displayLinks, regions, ringLinks, skills, type Skill, type SkillKind, type Status } from './skillData';
import '@xyflow/react/dist/style.css';

// Keep the v0.2 / v0.3 storage key so existing progress stays intact.
const STORAGE_KEY = 'lifetree-progress-v1';
const COLLAPSED_KEY = 'lifetree-collapsed-v1';
const skillsById = new Map(skills.map((skill) => [skill.id, skill]));

// A skill can be collapsed only if it has descendants.
const childrenById = new Map<string, string[]>();
for (const skill of skills) {
  if (!skill.parent) continue;
  const children = childrenById.get(skill.parent) ?? [];
  children.push(skill.id);
  childrenById.set(skill.parent, children);
}
const collapsibleIds = new Set(
  skills.filter((skill) => skill.id !== 'you' && childrenById.has(skill.id))
    .map((skill) => skill.id)
);

function getAncestors(id: string): string[] {
  const ancestorIds: string[] = [];
  let parentId = skillsById.get(id)?.parent;
  while (parentId) {
    ancestorIds.push(parentId);
    parentId = skillsById.get(parentId)?.parent;
  }
  return ancestorIds;
}

function getDescendantCount(id: string): number {
  let count = 0;
  const queue = [...(childrenById.get(id) ?? [])];
  while (queue.length) {
    const nextId = queue.pop()!;
    count += 1;
    queue.push(...(childrenById.get(nextId) ?? []));
  }
  return count;
}

const statusOptions: { id: Status; label: string; color: string }[] = [
  { id: 'unexplored', label: 'Unexplored', color: '#64748b' },
  { id: 'learning', label: 'Learning', color: '#38bdf8' },
  { id: 'practiced', label: 'Practiced', color: '#f59e0b' },
  { id: 'proficient', label: 'Proficient', color: '#22c55e' },
  { id: 'mastered', label: 'Mastered', color: '#a855f7' },
];

const statusColor: Record<Status, string> = Object.fromEntries(
  statusOptions.map(({ id, color }) => [id, color])
) as Record<Status, string>;

type SkillNodeData = {
  label: string;
  icon: string;
  kind: SkillKind;
  color: string;
  status: Status;
  highlighted: boolean;
  hasChildren: boolean;
  collapsed: boolean;
  descendants: number;
  onToggle: (id: string) => void;
};

type SkillNodeType = Node<SkillNodeData, 'skill'>;

function SkillNode({ id, data }: NodeProps<SkillNodeType>) {
  const diameter = data.kind === 'root' ? 102 : data.kind === 'category' ? 82 : 62;
  const ringColor = data.status !== 'unexplored'
    ? statusColor[data.status]
    : data.kind === 'skill' ? '#66758b' : data.color;

  const style = {
    '--diameter': `${diameter}px`,
    '--ring-color': ringColor,
    '--region-color': data.color,
  } as CSSProperties;

  const anchorStyle = { top: diameter / 2, left: '50%' };

  return (
    <div className={`skill-node ${data.kind} ${data.highlighted ? 'highlighted' : ''}`} style={style}>
      <Handle type="target" position={Position.Top} className="skill-anchor" style={anchorStyle} />
      <div className="skill-circle">
        <span className="skill-icon">{data.icon}</span>
      </div>
      <div className="skill-label">{data.label}</div>
      {data.hasChildren && (
        <button
          className={`branch-toggle nodrag nopan ${data.collapsed ? 'is-collapsed' : ''}`}
          type="button"
          title={`${data.collapsed ? 'Expand' : 'Collapse'} ${data.label} (${data.descendants} descendant skills)`}
          aria-label={`${data.collapsed ? 'Expand' : 'Collapse'} ${data.label} branch`}
          aria-expanded={!data.collapsed}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            data.onToggle(id);
          }}
        >
          {data.collapsed ? '+' : '−'}
        </button>
      )}
      <Handle type="source" position={Position.Top} className="skill-anchor" style={anchorStyle} />
    </div>
  );
}

// An arc connecting related skills around the center of the map.
function OrbitEdge({ id, sourceX, sourceY, targetX, targetY, style }: EdgeProps) {
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;
  const path = `M ${sourceX} ${sourceY} Q ${midX * 1.10} ${midY * 1.10} ${targetX} ${targetY}`;
  return <BaseEdge id={id} path={path} style={style} />;
}

// Static component maps should not be declared inside App.
const nodeTypes = { skill: SkillNode };
const edgeTypes = { orbit: OrbitEdge };

function getSkillPath(skill: Skill): string {
  const names = [skill.label];
  let parentId = skill.parent;
  while (parentId && parentId !== 'you') {
    const parent = skillsById.get(parentId);
    if (!parent) break;
    names.unshift(parent.label);
    parentId = parent.parent;
  }
  return names.join(' / ');
}

export default function App() {
  const [progress, setProgress] = useState<Record<string, Status>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) as Record<string, Status> : {};
    } catch {
      return {};
    }
  });
  const [collapsedIds, setCollapsedIds] = useState<string[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(COLLAPSED_KEY) ?? '[]') as unknown;
      return Array.isArray(saved)
        ? saved.filter((id): id is string => typeof id === 'string' && collapsibleIds.has(id))
        : [];
    } catch {
      return [];
    }
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusRegionId, setFocusRegionId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeResult, setActiveResult] = useState(0);
  const flowRef = useRef<ReactFlowInstance<SkillNodeType, Edge> | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // The tree stays usable if browser storage is disabled.
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSED_KEY, JSON.stringify(collapsedIds));
    } catch {
      // Collapsing still works without local browser storage.
    }
  }, [collapsedIds]);

  const collapsed = useMemo(() => new Set(collapsedIds), [collapsedIds]);
  const hiddenIds = useMemo(() => new Set(
    skills.filter((skill) => {
      const ancestors = getAncestors(skill.id);
      const folded = ancestors.some((id) => collapsed.has(id));
      const outsideFocus = focusRegionId !== null &&
        skill.id !== focusRegionId && !ancestors.includes(focusRegionId);
      return folded || outsideFocus;
    }).map((skill) => skill.id)
  ), [collapsed, focusRegionId]);

  const toggleBranch = useCallback((id: string) => {
    if (!collapsibleIds.has(id)) return;
    setCollapsedIds((current) => current.includes(id)
      ? current.filter((entry) => entry !== id)
      : [...current, id]
    );
    // A collapsed branch's children should not remain selected invisibly.
    setSelectedId((current) => current && getAncestors(current).includes(id) ? id : current);
  }, []);

  const nodes = useMemo<SkillNodeType[]>(() => skills.map((skill) => ({
    id: skill.id,
    type: 'skill',
    position: { x: skill.x, y: skill.y },
    data: {
      label: skill.label,
      icon: skill.icon,
      kind: skill.kind,
      color: skill.color,
      status: progress[skill.id] ?? 'unexplored',
      highlighted: selectedId === skill.id,
      hasChildren: collapsibleIds.has(skill.id),
      collapsed: collapsed.has(skill.id),
      descendants: getDescendantCount(skill.id),
      onToggle: toggleBranch,
    },
    hidden: hiddenIds.has(skill.id),
    draggable: false,
    selectable: skill.id !== 'you',
  })), [progress, selectedId, collapsed, hiddenIds, toggleBranch]);

  const edges = useMemo<Edge[]>(() => [
    ...displayLinks.map((link): Edge => {
      const status = progress[link.target] ?? 'unexplored';
      return {
        id: `path-${link.target}`,
        source: link.source,
        target: link.target,
        type: 'straight',
        hidden: hiddenIds.has(link.source) || hiddenIds.has(link.target),
        style: {
          stroke: status === 'unexplored' ? '#465875' : statusColor[status],
          strokeWidth: status === 'unexplored' ? 2 : 3,
          opacity: status === 'unexplored' ? 0.8 : 1,
        },
      };
    }),
    ...ringLinks.map((link): Edge => ({
      id: `ring-${link.source}-${link.target}`,
      source: link.source,
      target: link.target,
      type: 'orbit',
      hidden: hiddenIds.has(link.source) || hiddenIds.has(link.target),
      style: {
        stroke: link.color,
        strokeWidth: 1.4,
        strokeDasharray: '4 7',
        opacity: 0.3,
      },
    })),
  ], [progress, hiddenIds]);

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return skills
      .filter((skill) => skill.id !== 'you' && (
        skill.label.toLowerCase().includes(term) ||
        getSkillPath(skill).toLowerCase().includes(term)
      ))
      .sort((a, b) => {
        const aStarts = a.label.toLowerCase().startsWith(term) ? 0 : 1;
        const bStarts = b.label.toLowerCase().startsWith(term) ? 0 : 1;
        return aStarts - bStarts || a.label.localeCompare(b.label);
      })
      .slice(0, 8);
  }, [searchTerm]);

  const selected = selectedId ? skillsById.get(selectedId) : undefined;
  const selectedStatus = selected ? (progress[selected.id] ?? 'unexplored') : 'unexplored';
  const trackedCount = skills.filter(
    (skill) => skill.id !== 'you' && progress[skill.id] && progress[skill.id] !== 'unexplored'
  ).length;
  const visibleCount = skills.filter((skill) => skill.id !== 'you' && !hiddenIds.has(skill.id)).length;

  function updateStatus(status: Status) {
    if (!selectedId) return;
    setProgress((current) => ({ ...current, [selectedId]: status }));
  }

  function focusSkill(skill: Skill) {
    // Search also finds hidden skills. Reveal their ancestors before navigating.
    const ancestors = new Set(getAncestors(skill.id));
    setFocusRegionId(null);
    setCollapsedIds((current) => current.filter((id) => !ancestors.has(id)));
    setSelectedId(skill.id);
    setSearchTerm('');
    setSearchOpen(false);
    setActiveResult(0);
    // With nodeOrigin={[0.5, 0.5]}, skill.x/y are the node centers.
    void flowRef.current?.setCenter(skill.x, skill.y, { zoom: 1.15, duration: 650 });
  }

  function resetView() {
    setFocusRegionId(null);
    setCollapsedIds([]);
    setSelectedId(null);
    setSearchTerm('');
    setSearchOpen(false);
    // Wait for newly revealed nodes to mount before fitting the whole map.
    requestAnimationFrame(() => {
      void flowRef.current?.fitView({ padding: 0.12, maxZoom: 0.85, duration: 650 });
    });
  }

  function fitVisible() {
    void flowRef.current?.fitView({ padding: 0.15, maxZoom: 1.15, duration: 650 });
  }

  function focusRegion(skill: Skill) {
    let current: Skill | undefined = skill;
    while (current && current.parent && current.parent !== 'you') {
      current = skillsById.get(current.parent);
    }
    if (!current || current.id === 'you') return;
    setFocusRegionId(current.id);
    setCollapsedIds((ids) => ids.filter((id) => id !== current!.id));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      void flowRef.current?.fitView({ padding: 0.2, maxZoom: 1.1, duration: 650 });
    }));
  }

  function showAllRegions() {
    setFocusRegionId(null);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      void flowRef.current?.fitView({ padding: 0.16, maxZoom: 0.9, duration: 650 });
    }));
  }

  function handleSearchKeys(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' && searchResults.length) {
      event.preventDefault();
      setSearchOpen(true);
      setActiveResult((index) => Math.min(index + 1, searchResults.length - 1));
    } else if (event.key === 'ArrowUp' && searchResults.length) {
      event.preventDefault();
      setActiveResult((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter' && searchResults.length) {
      event.preventDefault();
      focusSkill(searchResults[Math.min(activeResult, searchResults.length - 1)]);
      event.currentTarget.blur();
    } else if (event.key === 'Escape') {
      setSearchOpen(false);
      event.currentTarget.blur();
    }
  }

  return (
    <div className="app">
      <ReactFlow<SkillNodeType, Edge>
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodeOrigin={[0.5, 0.5]}
        colorMode="dark"
        fitView
        fitViewOptions={{ padding: 0.16, maxZoom: 0.9 }}
        minZoom={0.14}
        maxZoom={2.5}
        nodesDraggable={false}
        nodesConnectable={false}
        edgesFocusable={false}
        edgesReconnectable={false}
        onInit={(instance) => { flowRef.current = instance; }}
        onNodeClick={(_, node) => {
          if (node.id !== 'you') {
            setSelectedId(node.id);
            setSearchOpen(false);
          }
        }}
        onPaneClick={() => {
          setSelectedId(null);
          setSearchOpen(false);
        }}
      >
        <Background variant={BackgroundVariant.Dots} color="#32405a" gap={28} size={1} />
        <Controls />
      </ReactFlow>

      <header className="header">
        <h1>LIFETREE <span>v0.7</span></h1>
        <p>{trackedCount} / {skills.length - 1} skills tracked</p>
        <p className="hint">Compact constellations · Scroll to zoom · Drag to explore</p>
        <p className="hint">Lines group related skills; they are not prerequisites.</p>

        <div className="search-area">
          <div className="search-row">
            <input
              className="skill-search"
              type="search"
              value={searchTerm}
              placeholder="Find a skill..."
              aria-label="Find a skill"
              autoComplete="off"
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setSearchOpen(true);
                setActiveResult(0);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={handleSearchKeys}
            />
            <button className="reset-view" type="button" onClick={resetView}>
              View all
            </button>
          </div>
          <div className="branch-toolbar">
            <button type="button" onClick={() => setCollapsedIds(regions.map((region) => region.id))}>
              Collapse regions
            </button>
            <button type="button" onClick={() => setCollapsedIds([])}>
              Expand all
            </button>
            <button type="button" onClick={fitVisible}>
              Fit visible
            </button>
            {focusRegionId && (
              <button type="button" onClick={showAllRegions}>
                Show all regions
              </button>
            )}
          </div>
          <p className="visible-count">{visibleCount} of {skills.length - 1} skill nodes visible{focusRegionId ? ' · Focus mode' : ''}</p>

          {searchOpen && searchTerm.trim() && (
            <div className="search-results" role="listbox" aria-label="Matching skills">
              {searchResults.length ? searchResults.map((skill, index) => (
                <button
                  className={`search-result ${index === activeResult ? 'search-result-active' : ''}`}
                  key={skill.id}
                  type="button"
                  role="option"
                  aria-selected={index === activeResult}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => focusSkill(skill)}
                >
                  <span className="result-icon">{skill.icon}</span>
                  <span className="result-text">
                    <strong>{skill.label}</strong>
                    <small>{getSkillPath(skill)}</small>
                  </span>
                  <span
                    className="result-status"
                    title={progress[skill.id] ?? 'unexplored'}
                    style={{ background: statusColor[progress[skill.id] ?? 'unexplored'] }}
                  />
                </button>
              )) : (
                <p className="no-results">No matching skills yet.</p>
              )}
            </div>
          )}
        </div>

        <div className="region-legend">
          {regions.map((region) => (
            <span key={region.id}>
              <i style={{ background: region.color }} />{region.label}
            </span>
          ))}
        </div>
      </header>

      {selected && (
        <aside className="skill-panel">
          <button className="close-button" onClick={() => setSelectedId(null)} aria-label="Close">×</button>
          <div className="panel-icon">{selected.icon}</div>
          <h2>{selected.label}</h2>
          <p className="panel-path">{getSkillPath(selected)}</p>
          {collapsibleIds.has(selected.id) && (
            <button
              className="panel-branch-button"
              type="button"
              onClick={() => toggleBranch(selected.id)}
              aria-expanded={!collapsed.has(selected.id)}
            >
              {collapsed.has(selected.id) ? '＋ Expand' : '− Collapse'} branch
              <small>{getDescendantCount(selected.id)} descendant skills</small>
            </button>
          )}
          <button
            type="button"
            className="panel-focus-button"
            onClick={() => focusRegion(selected)}
          >
            ◎ Focus this region
          </button>
          <p className="panel-subtitle">How far along are you?</p>
          <div className="status-options">
            {statusOptions.map((status) => (
              <button
                key={status.id}
                className={`status-button ${selectedStatus === status.id ? 'active' : ''}`}
                onClick={() => updateStatus(status.id)}
              >
                <span className="status-dot" style={{ background: status.color }} />
                {status.label}
                {selectedStatus === status.id && <span className="status-check">✓</span>}
              </button>
            ))}
          </div>
          <p className="save-note">Changes save automatically in this browser.</p>
        </aside>
      )}
    </div>
  );
}
