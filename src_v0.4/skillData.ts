export type Status =
  | 'unexplored'
  | 'learning'
  | 'practiced'
  | 'proficient'
  | 'mastered';

export type SkillKind = 'root' | 'category' | 'skill';

export type Skill = {
  id: string;
  label: string;
  icon: string;
  kind: SkillKind;
  color: string;
  x: number;
  y: number;
  parent?: string;
};

type Entry = { id: string; label: string; icon: string };
type Branch = Entry & { leaves: [Entry, Entry] };
export type Region = Entry & {
  color: string;
  angle: number;
  branches: [Branch, Branch];
};

export const regions: Region[] = [
  {
    id: 'engineering', label: 'Engineering', icon: '⚙️', color: '#38bdf8', angle: -150,
    branches: [
      { id: 'electronics', label: 'Electronics', icon: '⚡', leaves: [
        { id: 'stm32', label: 'Microcontrollers', icon: '🔌' },
        { id: 'circuits', label: 'Circuit Design', icon: '🔋' },
      ] },
      { id: 'programming', label: 'Programming', icon: '💻', leaves: [
        { id: 'python', label: 'Python', icon: '🐍' },
        { id: 'algorithms', label: 'Algorithms', icon: '🧩' },
      ] },
    ],
  },
  {
    id: 'finance', label: 'Finance', icon: '💰', color: '#facc15', angle: -90,
    branches: [
      { id: 'budgeting', label: 'Budgeting', icon: '📊', leaves: [
        { id: 'expenses', label: 'Expense Tracking', icon: '🧾' },
        { id: 'emergency', label: 'Emergency Fund', icon: '🏦' },
      ] },
      { id: 'investing', label: 'Investing', icon: '📈', leaves: [
        { id: 'stocks', label: 'Stocks', icon: '📉' },
        { id: 'retirement', label: 'Retirement Planning', icon: '🪙' },
      ] },
    ],
  },
  {
    id: 'physical', label: 'Physical', icon: '💪', color: '#4ade80', angle: -30,
    branches: [
      { id: 'strength', label: 'Strength', icon: '🏋️', leaves: [
        { id: 'weightlifting', label: 'Weightlifting', icon: '🏆' },
        { id: 'calisthenics', label: 'Calisthenics', icon: '🤸' },
      ] },
      { id: 'endurance', label: 'Endurance', icon: '❤️', leaves: [
        { id: 'running', label: 'Running', icon: '🏃' },
        { id: 'cycling', label: 'Cycling', icon: '🚴' },
      ] },
    ],
  },
  {
    id: 'creative', label: 'Creative', icon: '🎨', color: '#f472b6', angle: 30,
    branches: [
      { id: 'cooking', label: 'Cooking', icon: '🍳', leaves: [
        { id: 'baking', label: 'Baking', icon: '🍰' },
        { id: 'knife', label: 'Knife Skills', icon: '🔪' },
      ] },
      { id: 'printing', label: '3D Printing', icon: '🖨️', leaves: [
        { id: 'cad', label: 'CAD Design', icon: '📐' },
        { id: 'slicing', label: 'Print Slicing', icon: '🧱' },
      ] },
    ],
  },
  {
    id: 'outdoors', label: 'Outdoors', icon: '🏔️', color: '#fb923c', angle: 90,
    branches: [
      { id: 'survival', label: 'Survival', icon: '🧭', leaves: [
        { id: 'navigation', label: 'Navigation', icon: '🗺️' },
        { id: 'firstaid', label: 'First Aid', icon: '🩹' },
      ] },
      { id: 'adventure', label: 'Adventure', icon: '🥾', leaves: [
        { id: 'hiking', label: 'Hiking', icon: '🌲' },
        { id: 'climbing', label: 'Climbing', icon: '🧗' },
      ] },
    ],
  },
  {
    id: 'social', label: 'Social', icon: '💬', color: '#a78bfa', angle: 150,
    branches: [
      { id: 'communication', label: 'Communication', icon: '🗣️', leaves: [
        { id: 'speaking', label: 'Public Speaking', icon: '🎤' },
        { id: 'conversation', label: 'Conversation', icon: '💭' },
      ] },
      { id: 'emotional', label: 'Emotional Intelligence', icon: '🧠', leaves: [
        { id: 'listening', label: 'Active Listening', icon: '👂' },
        { id: 'empathy', label: 'Empathy', icon: '🤝' },
      ] },
    ],
  },
];

const point = (degrees: number, radius: number) => {
  const radians = degrees * Math.PI / 180;
  return { x: Math.cos(radians) * radius, y: Math.sin(radians) * radius };
};

export const skills: Skill[] = [
  { id: 'you', label: 'YOU', icon: '✦', kind: 'root', color: '#c4b5fd', x: 0, y: 0 },
];

// Curved, decorative connections along the two outer rings.
// These are related-skill links, not required unlock paths.
export const ringLinks: { source: string; target: string; color: string }[] = [];

for (const region of regions) {
  skills.push({ ...region, kind: 'category', parent: 'you', ...point(region.angle, 245) });

  for (const [branchIndex, branch] of region.branches.entries()) {
    const branchAngle = region.angle + (branchIndex === 0 ? -13 : 13);
    skills.push({ ...branch, kind: 'skill', color: region.color, parent: region.id, ...point(branchAngle, 470) });

    for (const [leafIndex, leaf] of branch.leaves.entries()) {
      const leafAngle = branchAngle + (leafIndex === 0 ? -7 : 7);
      skills.push({ ...leaf, kind: 'skill', color: region.color, parent: branch.id, ...point(leafAngle, 750) });
    }

    ringLinks.push({
      source: branch.leaves[0].id,
      target: branch.leaves[1].id,
      color: region.color,
    });
  }

  ringLinks.push({
    source: region.branches[0].id,
    target: region.branches[1].id,
    color: region.color,
  });
}
