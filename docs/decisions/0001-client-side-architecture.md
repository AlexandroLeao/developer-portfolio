# ADR 0001: Client-Side React Architecture

## Status

Accepted — documented retrospectively.

## Context

The Developer Portfolio needs to present professional content
through a responsive, bilingual, interactive web application.

Its current requirements include theme switching, expandable
content, navigation, and accessible contact interactions.

The application does not require authentication, a dedicated
backend API, or a database.

## Decision

Use the following frontend architecture:

- React for reusable interface components and state.
- TypeScript for static typing and structured content models.
- Vite for development tooling and production builds.
- Tailwind CSS and CSS variables for styling and themes.
- Typed local modules for portfolio content.
- Browser LocalStorage for language and theme preferences.

Host the production build as a static frontend on Vercel.

## Rationale

This approach supports interactive UI requirements without
introducing unnecessary backend infrastructure.

Typed content modules separate portfolio information from
reusable presentation components.

React state provides the interactions required by the current UI.

## Alternatives and Scope

A server-rendered framework or a separate backend could be
appropriate for more complex requirements.

Those capabilities are not necessary for the implemented
portfolio and were not introduced solely for this project.

## Consequences

### Benefits

- Reusable and maintainable UI components.
- Static hosting and straightforward deployment.
- Type checking during development and production builds.
- No application database or backend server to maintain.

### Trade-offs

- Some interface content is coordinated in App.tsx.
- Static content updates require a new deployment.
- Browser LocalStorage is specific to the user's browser.

## Evidence

- src/main.tsx
- src/App.tsx
- src/components/
- src/data/
- src/index.css
- package.json
