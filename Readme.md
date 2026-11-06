# Starforge Frontier

**Starforge Frontier** is a space exploration RPG sandbox prototype built by **SinLess Games LLC**.

The project combines large-scale frontier exploration, ship ownership, base building, quest-driven progression, and premium RUN.game SDK integrations into a TypeScript-first game foundation.

## Project Status

This project is in early prototype development.

Current focus:

- Babylon.js scene rendering
- React-based UI shell
- TypeScript game architecture
- Tauri desktop runtime
- RUN.game SDK safety wrappers
- Access-gated premium SDK calls
- First playable vertical slice

## Tech Stack

- **Language:** TypeScript
- **Frontend:** React
- **Build Tool:** Vite
- **3D Engine:** Babylon.js
- **Desktop Runtime:** Tauri
- **State Management:** Zustand
- **Validation:** Zod
- **Testing:** Vitest
- **Linting:** ESLint
- **Formatting:** Prettier
- **Styles:** CSS / Sass / PostCSS / Autoprefixer
- **Storage:** idb-keyval
- **Audio:** Howler
- **RUN.game SDK:** `@series-inc/rundot-game-sdk`

## Core Game Pillars

### Seamless Frontier Exploration

Players explore unknown worlds, discover resources, encounter hazards, and uncover ancient or alien mysteries across frontier space.

### Player-Owned Identity

The player’s ship, equipment, base, faction standing, and choices define their long-term identity in the game world.

### Ship as Home, Tool, and Weapon

Ships are not just transportation. They are upgradeable homes, combat platforms, cargo haulers, exploration tools, and expressions of player style.

### Detailed Base Building

Players can establish outposts, expand them into functional settlements, and use them for crafting, storage, research, trade, and survival.

### Quest-Driven Sandbox

The world supports structured quests, branching choices, faction relationships, and emergent exploration goals.

### Humans and Aliens

Starforge Frontier includes both human factions and alien civilizations, each with their own cultures, conflicts, and gameplay roles.

## Development Setup

### Requirements

- Node.js 22.13 or newer, or Node.js 24 or newer (`^22.13.0 || >=24`)
- pnpm 11 or newer
- Rust 1.88 or newer
- Linux Tauri dependencies

Rust 1.88 is the `plist` 1.10 minimum. That crate is the macOS target dependency of Tauri 2.11, and 1.10.x is what pulls `quick-xml` 0.42 (`RUSTSEC-2026-0194` and `RUSTSEC-2026-0195`). Tauri stays on 2.11. Tauri 2.12 is a separate toolchain jump (Rust 1.90) and is not part of this fix.

`glib` 0.18.5 remains on the gtk 0.18 stack that Tauri 2.11 and wry 0.55 pin. `GHSA-wrw7-89jp-8q8g` (`VariantStrIter` unsoundness) is fixed in glib 0.20, which is not available on this line.

`@series-inc/rundot-game-sdk` stays at 5.20.0. Its postinstall downloads a zip and extracts it with `adm-zip` 0.5.x, so `pnpm-workspace.yaml` sets that package's `allowBuilds` entry to `false` and the script does not run. SDK 5.35.0 drops `adm-zip`, replaces the postinstall with `install-hint.mjs`, and adds a `ws` dependency. That release still needs an API and postinstall review before it is adopted. Do not flip `allowBuilds` to `true` while 5.20.0 is installed.

`zod`, `rxdb`, and `colyseus.js` are not referenced by the app and are not dependencies. `firebase` stays, because `@series-inc/rundot-game-sdk` 5.20.0 dynamically imports `firebase/app`, `firebase/auth`, and `firebase/firestore`, and the Vite build fails if that package is missing. `@grpc/grpc-js` is overridden to 1.14.7 and `protobufjs` to 7.6.6. Firestore declares `@grpc/grpc-js` as `~1.9.0`, so 1.14.7 is outside that range. If `ws` is pulled back into the tree, the override keeps it at 8.22.1 or newer. `GHSA-73jw-fp74-p77x` affects every `ws` release before 8.21.1, so 8.21.0 is not a fix.

### Install Dependencies

```bash
pnpm install
```

### Start Web Development Server

```bash
pnpm dev
```

### Start Desktop Development App

```bash
pnpm desktop:dev
```

### Build Web App

```bash
pnpm build
```

### Build Desktop App

```bash
pnpm desktop:build
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm typecheck
pnpm lint
pnpm test
pnpm test:watch
pnpm format
pnpm format:check
pnpm desktop:dev
pnpm desktop:build
pnpm clean
```

## Project Structure

```txt
src/
  app/
  assets/
  engine/
    babylon/
    ecs/
    physics/
    procedural/
  game/
    bases/
    character/
    factions/
    inventory/
    quests/
    resources/
    save/
    ships/
    world/
  integrations/
    rundot/
  styles/
  ui/
    components/
    hud/
    screens/

src-tauri/
  src/
  Cargo.toml
  tauri.conf.json
```

## RUN.game SDK Integration

The project includes a safety layer for RUN.game SDK calls.

Fire-and-forget calls are wrapped so rejected SDK promises do not crash the host app:

```ts
rundotFireAndForget.log('player scored');
rundotFireAndForget.analyticsEvent('level_start', { level: 1 });
rundotFireAndForget.toast('Progress saved');
```

Awaited SDK calls should use safe wrappers:

```ts
const result = await rundotCall('appStorage.setItem', () =>
  RundotGameAPI.appStorage.setItem('save-slot-1', JSON.stringify(saveData)),
);
```

Premium gated SDK calls use the Access Gate wrapper:

```ts
const result = await rundotPremium.getTextModels();

if (result.ok) {
  console.info(result.value);
} else if (result.reason === 'access-denied') {
  console.info('Login required:', result.access.requiredTier);
}
```

## First Playable Slice

The current gameplay milestone is:

```txt
Launch app
Render terrain
Spawn player camera
Spawn starter ship
Place one base module
Save/load module position
Show one quest objective
```

## Development Checks

Run these before committing:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Git Setup

Initialize and commit the prototype:

```bash
git init
git branch -m main
git add .
git commit -m "Initial Starforge Frontier prototype setup"
```

## License

UNLICENSED

Copyright © SinLess Games LLC.


