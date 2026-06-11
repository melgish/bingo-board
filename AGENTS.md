# AGENTS.md

## Stack
Svelte 4 + Vite 5 + Vitest (jsdom) + TypeScript + Prettier.

## Commands
- `npm run dev` — dev server
- `npm run build` — production build to `dist/`
- `npm run check` — `svelte-check --tsconfig ./tsconfig.json`
- `npm test` — vitest (watch mode)
- `npm run ci:test` — `vitest run --coverage`
- `npm run format` — `prettier src --write`

## Prettier conventions (non-default)
- No semicolons (`semi: false`)
- Double quotes (`singleQuote: false`)
- `svelteSortOrder: options-scripts-markup-styles`
- `svelteAllowShorthand: true`
- `bracketSameLine: true`

## Testing
- Tests are `*.test.ts` alongside sources in `src/lib/`.
- Uses `@testing-library/svelte` with `@testing-library/jest-dom` matchers.
- `src/vitest.setup.ts` is the setup file (auto-cleanup, `scrollTo` mock).
- Snapshots live in `src/__snapshots__/` and `src/lib/__snapshots__/`.
- CI runs `vitest run --coverage` on Node 20.

## Architecture
- Entry: `src/main.ts` → `src/App.svelte`
- Router: `svelte-routing`, two routes: `/` (Board), `/cards` (Cards)
- Stores: `src/lib/calls.store.ts`, `src/lib/marks.store.ts`
- Components: `src/lib/Board.svelte`, `src/lib/Card.svelte`, `src/lib/Cards.svelte`, `src/lib/Ball.svelte`, `src/lib/Button.svelte`, `src/lib/Letter.svelte`
- Utils: `src/lib/bingo-utils.ts`, `src/lib/game-maps.ts`

## Docker
Multi-stage: `node:20-alpine` → build → `lipanski/docker-static-website`. Serves on port 3000.
