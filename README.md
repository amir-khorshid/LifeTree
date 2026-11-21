# LifeTree v0.5 — Expandable branches

A drop-in update for your existing LifeTree v0.4 Vite + React + TypeScript project.
**Keep `@xyflow/react@12.10.2`.** No new packages required.

## Install

1. Back up your current `src/` folder.
2. Extract this archive and copy its three `src/` files into your **existing** `life-tree/src/` folder, replacing the existing files.
3. Keep your existing `package.json`, `src/main.tsx`, and other project files.
4. Save; Vite should hot reload automatically. Otherwise run `npm run dev`.

## What's new

- A +/- button on expandable category and branch nodes.
- The selected skill panel also offers Collapse / Expand when applicable.
- **Collapse regions** hides all branches of the six major life-skill regions, leaving the central node and region nodes visible.
- **Expand all** shows every node, while **Fit visible** centers the current visible layout.
- **View all** expands everything and fits the full tree.
- Search still finds skills hidden inside collapsed branches, automatically opens their ancestor branches, and zooms to the result.
- Collapsed/expanded branches persist between page refreshes. Skill progress remains untouched.
- Hidden paths and decorative links are hidden along with their node endpoints.

## Test

1. Click **Collapse regions**, then **Fit visible**: only YOU and six region nodes should be visible.
2. Click the **+** button on **Engineering**: its subskills should reappear.
3. Click **-** on **Electronics**: Microcontrollers and Circuit Design should disappear, without deleting their statuses.
4. Search **Microcontrollers**: the Engineering/Electronics ancestors should open and the camera should focus on Microcontrollers.
5. Change its progress to Learning, refresh, and check that its status remains Learning.
6. Refresh after collapsing a branch: the collapsed state should remain saved.
7. Click **View all** to expand and reframe the entire tree.

## Data compatibility

- Identical skill IDs and data as v0.4 (43 total nodes; 42 skill/category nodes plus YOU).
- Uses **`lifetree-progress-v1`** for existing status values (unchanged).
- New separate key **`lifetree-collapsed-v1`** for branch visibility.
- Everything stays in the same browser's localStorage; this does not provide cloud backups or syncing.

## Technical note

Uses React Flow nodes' and edges' `hidden` properties and derives hidden descendants from each skill's `parent` relationship. The visibility toggle does **not** remove nodes from the skill data and does **not** modify progression values.
