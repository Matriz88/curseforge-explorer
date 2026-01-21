# CourseForge Explorer - Project Structure

This document describes the expected folder structure and file organization for the CourseForge Explorer project.

## Root Directory

```
courseforge-explorer/
├── .cursorrules              # Primary AI agent instructions
├── .cursor/                  # Additional AI context
│   └── README.md            # Extended context and patterns
├── PROJECT_STRUCTURE.md      # This file
├── package.json              # Dependencies and scripts
├── package-lock.json         # npm lock file
├── vite.config.ts            # Vite configuration (GitHub Pages base path)
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── index.html                # HTML entry point
├── .gitignore               # Git ignore rules
├── .github/                  # GitHub configuration
│   └── workflows/           # GitHub Actions workflows
│       └── deploy.yml        # GitHub Pages deployment
└── src/                      # Source code directory
```

## Source Directory (`src/`)

```
src/
├── main.tsx                  # Application entry point
├── vite-env.d.ts            # Vite type definitions
│
├── api/                      # API client and service layer
│   ├── client.ts             # API client factory (creates client with API key)
│   ├── courseforge.ts        # CourseForge API service definitions
│   └── types.ts              # API request/response types
│
├── components/               # React components
│   ├── ui/                   # Primitive reusable UI components
│   │   ├── Button.tsx        # Button component
│   │   ├── Input.tsx         # Input component
│   │   ├── Card.tsx          # Card component
│   │   ├── Badge.tsx         # Badge component
│   │   ├── Spinner.tsx       # Loading spinner
│   │   ├── ErrorMessage.tsx  # Error display component
│   │   └── index.ts          # Barrel export for UI components
│   │
│   └── layout/               # Layout components
│       ├── Header.tsx        # Header with API key input field
│       ├── Footer.tsx        # Footer component
│       └── Layout.tsx        # Main layout wrapper
│
├── features/                 # Feature-based components
│   ├── games/               # Game-related components
│   │   ├── GamesList.tsx    # List of games
│   │   ├── GameCard.tsx     # Individual game card
│   │   ├── GameDetails.tsx  # Game detail view
│   │   └── index.ts         # Barrel export
│   │
│   ├── mods/                # Mod-related components
│   │   ├── ModsList.tsx     # List of mods
│   │   ├── ModCard.tsx      # Individual mod card
│   │   ├── ModDetails.tsx   # Mod detail view
│   │   └── index.ts         # Barrel export
│   │
│   └── files/               # File-related components
│       ├── FilesList.tsx    # List of files
│       ├── FileCard.tsx     # Individual file card
│       ├── FileDetails.tsx  # File detail view
│       └── index.ts         # Barrel export
│
├── hooks/                    # Custom React hooks
│   ├── useApiKey.ts         # Hook to access API key from context
│   ├── useCourseForgeGames.ts    # Hook for fetching games
│   ├── useCourseForgeGame.ts     # Hook for fetching single game
│   ├── useCourseForgeMods.ts     # Hook for fetching mods
│   ├── useCourseForgeMod.ts      # Hook for fetching single mod
│   ├── useCourseForgeFiles.ts    # Hook for fetching files
│   ├── useCourseForgeFile.ts     # Hook for fetching single file
│   ├── useDebounce.ts       # Debounce utility hook
│   └── index.ts              # Barrel export
│
├── routes/                   # TanStack Router file-based routes
│   ├── __root.tsx           # Root route (layout wrapper)
│   ├── index.lazy.tsx       # Homepage route (lazy loaded)
│   │
│   ├── games/               # Game routes
│   │   ├── index.tsx        # Games list page
│   │   └── $gameId.tsx      # Game detail page (dynamic route)
│   │
│   ├── mods/                # Mod routes
│   │   ├── index.tsx        # Mods list page
│   │   └── $modId.tsx       # Mod detail page (dynamic route)
│   │
│   └── files/               # File routes
│       ├── index.tsx        # Files list page
│       └── $fileId.tsx      # File detail page (dynamic route)
│
├── store/                    # State management
│   ├── ApiKeyContext.tsx    # React Context for API key
│   └── ApiKeyProvider.tsx   # Context provider component
│
├── types/                    # TypeScript type definitions
│   ├── courseforge.ts       # CourseForge API types
│   ├── common.ts            # Common shared types
│   └── index.ts             # Barrel export
│
└── utils/                    # Utility functions
    ├── cn.ts                # className utility (clsx + tailwind-merge)
    ├── format.ts            # Formatting utilities
    └── index.ts             # Barrel export
```

## File Descriptions

### Configuration Files

- **`.cursorrules`**: Primary instruction file for Cursor and AI agents. Contains tech stack, coding standards, and architectural rules.
- **`.cursor/README.md`**: Additional context with patterns, examples, and architectural decisions.
- **`vite.config.ts`**: Vite configuration including base path for GitHub Pages and TanStack Router plugin.
- **`tsconfig.json`**: TypeScript compiler configuration.
- **`tailwind.config.js`**: Tailwind CSS configuration and theme customization.
- **`package.json`**: Project dependencies, scripts, and metadata.

### Source Files

#### Entry Point
- **`src/main.tsx`**: Application entry point. Sets up React, TanStack Router, TanStack Query, and renders the root component.

#### API Layer (`src/api/`)
- **`client.ts`**: Factory function that creates an API client instance configured with the user's API key.
- **`courseforge.ts`**: Service functions for all CourseForge API endpoints (games, mods, files).
- **`types.ts`**: TypeScript interfaces for API requests and responses.

#### Components (`src/components/`)

**UI Primitives (`components/ui/`)**
- Reusable, unstyled or minimally styled base components
- Should be composable and flexible
- Examples: Button, Input, Card, Badge, Spinner, ErrorMessage

**Layout Components (`components/layout/`)**
- **`Header.tsx`**: Contains the persistent API key input field and navigation
- **`Footer.tsx`**: Footer component
- **`Layout.tsx`**: Main layout wrapper that combines Header, content area, and Footer

#### Features (`src/features/`)
- Domain-specific components that combine UI primitives with business logic
- Organized by feature domain (games, mods, files)
- Each feature can have list, card, and detail components

#### Hooks (`src/hooks/`)
- **`useApiKey.ts`**: Hook to access the API key from ApiKeyContext
- **`useCourseForge*.ts`**: Custom hooks that wrap TanStack Query for specific API endpoints
- **`useDebounce.ts`**: Utility hook for debouncing values (useful for search inputs)

#### Routes (`src/routes/`)
- TanStack Router file-based routes
- **`__root.tsx`**: Root route that provides the main layout
- **`index.lazy.tsx`**: Homepage route (lazy loaded for code splitting)
- Dynamic routes use `$` prefix (e.g., `$gameId.tsx`)

#### Store (`src/store/`)
- **`ApiKeyContext.tsx`**: React Context definition for API key state
- **`ApiKeyProvider.tsx`**: Context provider that wraps the application

#### Types (`src/types/`)
- TypeScript type definitions for the application
- **`courseforge.ts`**: Types for CourseForge API responses
- **`common.ts`**: Shared types used across the application

#### Utils (`src/utils/`)
- Utility functions and helpers
- **`cn.ts`**: Utility for combining classNames (typically using clsx and tailwind-merge)
- **`format.ts`**: Formatting utilities (dates, numbers, etc.)

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `GamesList.tsx`, `GameCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useApiKey.ts`, `useCourseForgeGames.ts`)
- **Utilities**: camelCase (e.g., `cn.ts`, `format.ts`)
- **Types**: camelCase (e.g., `courseforge.ts`, `common.ts`)
- **Routes**: Follow TanStack Router conventions (e.g., `__root.tsx`, `$gameId.tsx`)

### Directories
- **Components**: lowercase (e.g., `components/ui/`, `components/layout/`)
- **Features**: lowercase (e.g., `features/games/`, `features/mods/`)
- **Routes**: lowercase (e.g., `routes/games/`, `routes/mods/`)

## Import Patterns

### Barrel Exports
Use barrel exports (`index.ts`) in directories to simplify imports:

```typescript
// components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';

// Usage
import { Button, Input, Card } from '@/components/ui';
```

### Path Aliases
Configure path aliases in `tsconfig.json` and `vite.config.ts`:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// Usage
import { Button } from '@/components/ui';
import { useApiKey } from '@/hooks';
```

## File Organization Principles

1. **Co-location**: Keep related files together (e.g., feature components in the same directory)
2. **Single Responsibility**: Each file should have a single, clear purpose
3. **Barrel Exports**: Use `index.ts` files for cleaner imports
4. **Feature-Based**: Organize by feature/domain when it makes sense
5. **Reusability**: Place reusable components in `components/ui/`
6. **Separation of Concerns**: Separate API logic, UI components, and business logic

## Adding New Files

When adding new files:

1. **Components**: Place in appropriate directory (`ui/` for primitives, `layout/` for layout, `features/` for domain-specific)
2. **Hooks**: Add to `hooks/` directory, export from `hooks/index.ts`
3. **Routes**: Follow TanStack Router file-based routing conventions
4. **API Services**: Add to `api/courseforge.ts` or create new service file if needed
5. **Types**: Add to appropriate file in `types/` directory
6. **Utils**: Add to `utils/` directory, export from `utils/index.ts`

## GitHub Pages Considerations

- Base path must be configured in `vite.config.ts`
- All asset paths must work with the base path
- Routing must handle the base path correctly
- Consider using hash routing or configuring 404.html for client-side routing
