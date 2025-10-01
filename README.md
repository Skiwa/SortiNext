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
