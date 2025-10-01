# Claude Code Guidelines

## Commits

- Style: `(front) feat: description` or `(front) fix: description`
- Title ≤ 50 characters
- Optional context in parentheses: `(mobile)`, `(homepage)`, etc.
- Use imperative mood
- Commit body for technical details if necessary
- Examples:
  - `feat: init Next.js project`
  - `fix: crash in event modal (mobile)`
  - `chore: setup ESLint & Prettier`

## Code Style & Architecture

- Language: TypeScript
- **TypeScript rules**: NEVER use the "as" keyword for type assertions - proper typing and type guards only
- Frontend: Next.js + Tailwind
- Architecture: Hexagonal, Domain-Driven Design (DDD)
- Front structure: Atomic Design (atoms, molecules, organisms, templates, pages)
- Test-Driven Development (TDD) for all new features
- React hooks for logic
- Modular and reusable components
- Clean code principles, SOLID
- Favor immutability and pure functions
- Async actions clearly separated

## Documentation

- Clear README with setup instructions
- Internal documentation for important features
- Short, explanatory comments if necessary
- Include diagrams or schemas if relevant for architecture

## Workflow

- Branches: `main` for production, `dev` for development
- Branch naming: `feat/feature-name`, `fix/bug-name`
- Pull requests must be reviewed before merge
- Use descriptive PR titles
- Always write tests for critical features
- CI/CD setup to run tests automatically

## Miscellaneous

- Follow conventional folder structure: `/pages`, `/components`, `/services`, `/domain`, `/tests`
- Use environment variables for secrets
- Keep external dependencies minimal and updated
- Code formatting via Prettier/ESLint
- You can improve the CLAUDE_GUIDELINES.md file, only by adding lines and not altering some

## Project Specifics: Spotify Clone (Spotinext)

### Domain Contexts (DDD Bounded Contexts)

- **Music Library**: Tracks, albums, artists, playlists catalog
- **Player**: Audio playback, queue management, controls
- **Social**: Following artists, sharing, collaborative playlists
- **Discovery**: Recommendations, search, browse

### Core Features Roadmap

1. Authentication & User Management
2. Music Player (audio streaming, controls, queue)
3. Browse & Search (tracks, albums, artists, playlists)
4. Playlist Management (create, edit, add/remove tracks)
5. Library (liked songs, saved albums, followed artists)
6. Recommendations & Discovery
7. Social Features (sharing, collaborative playlists)

### Technical Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + React Testing Library + Playwright

### Folder Structure

```
/app                    # Next.js App Router pages
/components            # Atomic Design components
  /atoms               # Button, Input, Icon, etc.
  /molecules           # SearchBar, TrackItem, etc.
  /organisms           # Sidebar, Player, TrackList, etc.
  /templates           # Page layouts
/domain                # Domain models & business logic
  /authentication
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

### Software Craft Principles

- **Hexagonal Architecture**: Strict separation between domain, application, and infrastructure layers - domain must not depend on external concerns
- **TDD**: Write tests before implementation - this is mandatory and how we communicate about features
- **YAGNI**: Don't implement features until needed
- **KISS**: Keep solutions simple and straightforward
- **DRY**: Don't repeat yourself, but avoid premature abstraction
- **Boy Scout Rule**: Leave code cleaner than you found it
- **Refactoring**: Continuous small improvements
- **Code Review**: Every PR must be reviewed
- **Self-documenting code**: Code should be clear enough to understand without comments - only add comments when absolutely necessary to explain "why", not "what"

### Music Player Principles

- Seamless playback experience (no interruptions)
- Queue management (add, remove, reorder)
- Persistent playback state (resume on reload)
- Progressive loading for large playlists
- Offline capability consideration

### UI/UX Guidelines

- Dark theme by default (Spotify-like aesthetic)
- Responsive design (mobile-first)
- Smooth transitions and animations
- Keyboard shortcuts for power users
- Accessibility (ARIA labels, keyboard navigation)
- Loading states and skeleton screens
- Error boundaries and graceful degradation
