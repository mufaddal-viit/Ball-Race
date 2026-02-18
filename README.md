# Ball Race

Ball Race is currently a frontend-only single-player click game built with React and Vite. A player enters a username, clicks a moving ball to score points, can toggle difficulty, and can switch theme. This repository is a solid MVP base but not yet a production-ready game platform.

## Project Status

- Current stage: MVP / Prototype
- Runtime scope: Client-side only (no backend services)
- Multiplayer: Not implemented
- Authentication: Local-only username stored in browser localStorage
- Persistence: Username persists; scores reset on refresh
- Tests: Not implemented

## What the Game Does Today

- Username login screen
- Header with logged-in user and logout action
- Theme toggle (light/dark) via React Context
- Moving target (ball) inside a bounded game area
- Score tracking as `hits / total spawns`
- Difficulty toggle:
  - Normal: ball moves every 1000 ms
  - Difficult: ball moves every 700 ms
- Restart action that stores completed round score in in-memory history list

## Tech Stack

### Runtime and Build

- Node.js + npm
- Vite 7 (frontend dev server and build)
- React 19

### UI and Styling

- Tailwind CSS v4 via `@tailwindcss/vite`
- `react-icons` for theme toggle icons

### State Management

- React local state (`useState`, `useEffect`, `useRef`) for gameplay
- React Context for:
  - Auth context (`AuthProvider`)
  - Theme context (`ThemeProvider`)

### Tooling

- ESLint 9 with:
  - `@eslint/js`
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
  - `globals`

## Dependency Audit (Installed vs Active)

### Actively used in runtime

- `react`
- `react-dom`
- `react-icons`
- `tailwindcss`
- `@tailwindcss/vite`
- `@vitejs/plugin-react`
- `vite`

### Installed but currently not used by active app flow

- No known unused dependencies remain after cleanup.

## High-Level Architecture

Entry and provider composition:

1. `src/main.jsx` renders `<App />` in `StrictMode`.
2. `src/App.jsx` wraps app content with:
   - `<ThemeProvider>`
   - `<AuthProvider>`
3. `AppContent` renders:
   - `<Header />`
   - `<Login />`
   - `<BallGame />` only when `user` exists.

Data flow:

- Auth state is global via `AuthContext`.
- Theme state is global via `ThemeContext`.
- Gameplay state is local to `BallGame`.
- No server communication exists.

## Gameplay Logic Details

`src/Components/BallGame.jsx` drives core mechanics:

- Maintains local state:
  - `count`: successful clicks
  - `total`: number of target spawns
  - `position`: ball coordinates
  - `clicked`: prevents double-counting per spawn
  - `difficult`: speed toggle
  - `scoreList`: per-round history in memory
- Uses `boxRef` to read game box dimensions.
- On interval tick, computes random `(x, y)` within box bounds and increments `total`.
- Clicking ball increments `count` only once until next spawn.
- Restart records `count/total`, then resets counters.
- Toggling difficulty also triggers restart and resets round.

## Component and File Reference

### Root

- `.gitignore`: Standard Node/Vite ignores (`node_modules`, `dist`, logs, editor files).
- `package.json`: Scripts and dependency manifests.
- `package-lock.json`: Locked dependency tree.
- `index.html`: Vite HTML shell and root mounting node.
- `vite.config.js`: Vite config with React and Tailwind plugins.
- `tailwind.config.js`: Tailwind config with custom `bounceSpin` animation (currently unused in UI).
- `eslint.config.js`: ESLint ruleset used by `npm run lint`.
- `README.md`: Project documentation.

### Public Assets

- `public/ball.png`: App favicon referenced in `index.html`.
- `public/vite.svg`: Default Vite icon asset (unused in current UI).

### Source (`src`)

- `src/main.jsx`: Application bootstrap.
- `src/index.css`: Tailwind import and commented scaffold CSS.
- `src/App.jsx`: Provider setup and conditional game rendering.
- `src/Header.jsx`: Title, current user display, logout, theme toggle.

#### Components

- `src/Components/auth.jsx`:
  - Auth context provider and `useAuth` hook.
  - Stores/reads `user` from localStorage.
- `src/Components/Context.jsx`:
  - Theme context provider and `useTheme` hook.
  - Default theme is `dark`; toggle switches light/dark.
- `src/Components/Login.jsx`:
  - Username input with simple required validation.
  - Calls `Login(trimmedUsername)` from auth context.
- `src/Components/BallGame.jsx`:
  - Main game loop and score history.
- `src/Components/Ball.jsx`:
  - Renders clickable absolute-position target.
- `src/Components/MessageBox.jsx`:
  - Displays score text with theme-aware styles.

### Source Assets

- `src/assets/react.svg`: Default React icon asset.
- `src/assets/Background Full Screen-Night.json`: Large Lottie-style animation JSON not currently imported anywhere.

## Project Structure

```text
Ball-Race/
|-- public/
|   |-- ball.png
|   `-- vite.svg
|-- src/
|   |-- assets/
|   |   |-- Background Full Screen-Night.json
|   |   `-- react.svg
|   |-- Components/
|   |   |-- auth.jsx
|   |   |-- Ball.jsx
|   |   |-- BallGame.jsx
|   |   |-- Context.jsx
|   |   |-- Login.jsx
|   |   `-- MessageBox.jsx
|   |-- App.jsx
|   |-- Header.jsx
|   |-- index.css
|   `-- main.jsx
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- tailwind.config.js
`-- vite.config.js
```

## How to Run

### Prerequisites

- Node.js 20.19+ recommended for Vite 7
- npm 10+

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Then open the local URL printed by Vite (commonly `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Current Code Health Notes

Latest local checks:

- `npm run build`: Passes (project builds successfully)
- `npm run lint`: Passes

## Gaps Between MVP and Production

Current limitations that block production readiness:

- No backend or persistent game data
- No secure account system
- No multiplayer or matchmaking
- No anti-cheat protections
- No automated tests
- No analytics/telemetry
- No CI/CD release pipeline
- No observability (logs/metrics/traces)
- No live-ops admin tooling

## Next Phase: Make It a Real Game Platform

### Gameplay depth

- Timed rounds and match states (`lobby -> countdown -> active -> results`)
- Level progression and unlockable difficulty tiers
- Power-ups, penalties, and obstacle targets
- Combo/streak system and accuracy multipliers
- Daily/weekly challenges

### Multiplayer (your idea, strongly recommended)

- Real-time 1v1 mode first, then 4-player rooms
- Ranked matchmaking + private invite rooms
- Spectator mode
- Reconnect support for dropped clients
- Server-authoritative scoring to reduce cheating

### Account and progression

- Guest + registered accounts (email/OAuth)
- Player profile, MMR/rank, lifetime stats
- Cosmetic unlocks (ball trails, themes, badges)
- Cross-device progression sync

### Competitive and social systems

- Global and regional leaderboards
- Friends list and party queue
- In-game chat/emotes with moderation controls
- Season-based ladders and rewards

### Backend and infrastructure

- API service (Node.js/TypeScript + Express or NestJS)
- Real-time gateway (WebSocket/Socket.IO)
- Database (PostgreSQL) for accounts, matches, stats
- Redis for session state, matchmaking queues, and pub/sub
- Object storage/CDN for assets

### Security and fair play

- JWT auth + refresh token flow
- Rate limiting and abuse protection
- Input validation and schema enforcement
- Anti-cheat heuristics (click frequency anomalies, impossible reaction patterns)
- Audit logging for suspicious matches

### Quality engineering

- Unit tests for game logic and utility functions
- Component tests for UI states
- E2E tests for login, gameplay loop, and match flow
- Load tests for socket matchmaking under concurrency

### Observability and operations

- Structured logs (request/match/user identifiers)
- Metrics dashboards (match start rate, latency, disconnect rate)
- Tracing across API + realtime services
- Error tracking and alerting

### Delivery and deployment

- CI pipeline for lint/test/build
- CD pipeline to staging and production
- Environment-based config and secrets management
- Blue/green or canary deployment strategy

## Suggested Development Roadmap

### Phase 1: Stabilize MVP (1-2 weeks)

- Fix lint and cleanup unused dependencies/files.
- Extract game loop logic into testable utilities.
- Add basic unit tests and CI lint/build checks.

### Phase 2: Backend foundation (2-4 weeks)

- Add auth service, user profiles, and persistent score storage.
- Define API contracts and database schema.
- Keep single-player mode but persist results server-side.

### Phase 3: Multiplayer alpha (4-8 weeks)

- Introduce WebSocket match service.
- Implement room creation, 1v1 matchmaking, synchronized countdown.
- Add authoritative score events and result reconciliation.

### Phase 4: Production hardening (ongoing)

- Add ranked mode, leaderboards, anti-cheat, moderation.
- Scale readiness: load tests, observability, SLOs.
- Live ops: seasons, events, progression economy.

## Recommended Immediate Priority Order

1. Fix lint + code cleanup.
2. Remove inactive dependencies or wire them intentionally.
3. Add backend for persistent accounts/scores.
4. Ship real-time multiplayer with server-authoritative scoring.
5. Add tests, CI/CD, and observability before public launch.

---

This README is intentionally written as a complete project knowledge base so new contributors can understand both the current implementation and the path to a production-grade game.
