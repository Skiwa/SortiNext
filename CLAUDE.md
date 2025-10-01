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
/app                           # Next.js App Router
  /(routes)/                   # Application pages and layouts
  /api/                        # Backend API routes

/src                           # Frontend application
  /components                  # Atomic Design
    /atoms
    /molecules
    /organisms
    /templates
  /domain                      # Frontend business logic
    /player
    /queue
  /application                 # Frontend use cases
    /player
    /queue
  /infrastructure              # Frontend services
    /audio
    /storage
    /http

/server                        # Backend application
  /domain                      # Backend business logic
    /catalog
  /application                 # Backend use cases
    /catalog
  /infrastructure              # Backend services
    /database
    /http

/tests
  /src                         # Frontend tests
  /server                      # Backend tests

/public                        # Static assets
```

### Software Craft Principles

- **Hexagonal Architecture**: Strict separation between domain, application, and infrastructure layers - domain must not depend on external concerns
- **TDD**: Write tests before implementation - this is mandatory and how we communicate about features
- **Gherkin Tests**: All domain tests must use Gherkin syntax (Given/When/Then) for clarity and business alignment
- **YAGNI**: Don't implement features until needed
- **KISS**: Keep solutions simple and straightforward
- **DRY**: Don't repeat yourself, but avoid premature abstraction
- **Boy Scout Rule**: Leave code cleaner than you found it
- **Refactoring**: Continuous small improvements
- **Code Review**: Every PR must be reviewed
- **Self-documenting code**: Code should be clear enough to understand without comments - only add comments when absolutely necessary to explain "why", not "what"

### Use Cases & DTOs Architecture

- **Use Cases return Domain Entities**: Use cases must return domain entities/aggregates, not DTOs
- **DTOs in API Layer**: Transform entities to DTOs only in the API layer (`/app/api/`)
- **Separation of Concerns**: Keep business logic (use cases) separate from presentation logic (DTOs)
- **Reusability**: Use cases can be reused across different clients (REST API, GraphQL, CLI, etc.)
- **Example Structure**:

  ```typescript
  // Use case returns domain entity
  class GetOnePlayerUseCase {
    execute(id: PlayerId): Effect.Effect<Player, PlayerNotFound> {
      // Returns Player entity
    }
  }

  // API layer transforms to DTO
  export async function GET(request: Request) {
    const player = await GetOnePlayerUseCase.execute(id);
    return Response.json({
      id: player.getId(),
      currentTrack: player.getCurrentTrack()?.getId(),
      position: player.getPosition().getSeconds(),
    });
  }
  ```

### Testing Guidelines

- Use Gherkin syntax (Given/When/Then) for all domain tests
- Test business rules and behavior, not implementation details
- Focus on value objects and entities with real business logic
- Avoid testing simple getters/setters without business rules
- **Colocate tests**: Place test files next to source files (e.g., `Player.ts` and `Player.test.ts` in same directory)
- **Fixture pattern**: Use `createFixtures()` function with `given`/`when`/`then` objects for clear test structure
- Test structure example:

  ```typescript
  describe("Feature: PlaybackPosition", () => {
    let fixture: ReturnType<typeof createFixtures>;

    beforeEach(() => {
      fixture = createFixtures();
    });

    it("Given valid seconds, When creating position, Then it should store the value", () => {
      const seconds = fixture.given.validSeconds();
      const position = fixture.when.createPosition(seconds);
      fixture.then.shouldHaveSeconds(position, seconds);
    });
  });

  function createFixtures() {
    return {
      given: {
        validSeconds: () => 42,
      },
      when: {
        createPosition: (seconds: number) => PlaybackPosition.create(seconds),
      },
      then: {
        shouldHaveSeconds: (position: PlaybackPosition, expected: number) => {
          expect(position.getSeconds()).toBe(expected);
        },
      },
    };
  }
  ```

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
