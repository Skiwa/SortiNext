# Spotinext

A Spotify clone built with Next.js, following software craftsmanship principles and hexagonal architecture.

## Project Overview

Spotinext is a music streaming application that replicates core Spotify features while maintaining clean architecture, test-driven development, and SOLID principles.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (strict mode, no `as` keyword)
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + React Testing Library + Playwright
- **Architecture**: Hexagonal Architecture + Domain-Driven Design (DDD)
- **Design System**: Atomic Design

## Architecture

### Hexagonal Architecture Layers

- **Domain**: Pure business logic, no external dependencies
- **Application**: Use cases and orchestration
- **Infrastructure**: External concerns (API, storage, UI)

### Domain Contexts (Bounded Contexts)

- **Music Library**: Tracks, albums, artists, playlists catalog
- **Player**: Audio playback, queue management, controls
- **Social**: Following artists, sharing, collaborative playlists
- **Discovery**: Recommendations, search, browse

## Project Structure

```
/app                    # Next.js App Router pages
/components            # Atomic Design components
  /atoms               # Button, Input, Icon, etc.
  /molecules           # SearchBar, TrackItem, etc.
  /organisms           # Sidebar, Player, TrackList, etc.
  /templates           # Page layouts
/domain                # Domain models & business logic
  /library
  /player
  /discovery
/services              # Infrastructure services
  /api                 # API clients
  /storage             # LocalStorage, IndexedDB
  /audio               # Audio player service
/adapters              # Hexagonal architecture adapters
  /repositories        # Data access
  /controllers         # API controllers
/tests                 # Unit, integration, e2e tests
/public                # Static assets
```

## Development Principles

- **TDD**: Tests first, always - this is how we communicate
- **Hexagonal Architecture**: Domain independence
- **YAGNI**: Build only what's needed
- **KISS**: Simple solutions over complex ones
- **Self-documenting code**: Clear code over comments
- **No type assertions**: Proper typing and type guards only

## Getting Started

### Prerequisites

- Node.js 20+
- npm/yarn/pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Testing

```bash
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
```

### Build

```bash
npm run build
npm run start
```

## Contributing

See [CLAUDE_GUIDELINES.md](./CLAUDE_GUIDELINES.md) for detailed development guidelines.

### Commit Convention

```
(front) feat: add player controls
(front) fix: resolve queue persistence issue
chore: update dependencies
```

- Title ≤ 50 characters
- Imperative mood
- Optional context in parentheses

### Workflow

- `main`: production branch
- `dev`: development branch
- Feature branches: `feat/feature-name`
- Bug fixes: `fix/bug-name`

## Roadmap

1. ✅ Project setup
2. ⏳ Music Player (audio streaming, controls, queue)
3. ⏳ Browse & Search (tracks, albums, artists, playlists)
4. ⏳ Playlist Management (create, edit, add/remove tracks)
5. ⏳ Library (liked songs, saved albums, followed artists)
6. ⏳ Recommendations & Discovery
7. ⏳ Social Features (sharing, collaborative playlists)

## License

MIT
