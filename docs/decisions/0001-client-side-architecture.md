# ADR 0001 — Client-Side React Architecture

**Status:** Accepted (retrospectively documented)  
**Scope:** Developer Portfolio application

## Context

Developer Portfolio presents professional content through a responsive, bilingual, interactive web interface. Its implemented requirements include theme switching, navigation, project/certification details and accessible contact interactions. Visitor authentication, a dedicated backend API and an application database are not required.

## Decision

Use a **client-side React single-page application**:

- React for interface composition and state.
- TypeScript for typed content and component contracts.
- Vite for development and a static production build.
- Tailwind CSS and CSS custom properties for styling and themes.
- Local typed modules under `src/data/` for portfolio content.
- Browser `localStorage` for language and theme preferences.
- Vercel for hosting the static build.

## Alternatives Considered

A server-rendered framework or a separate backend could be justified by future authenticated or server-side capabilities. Neither is necessary for the implemented portfolio, so adding them would increase complexity without satisfying an existing requirement.

## Consequences

### Benefits

- Reusable typed interface components.
- Straightforward static hosting, caching and deployment.
- No application server or database to provision and maintain.
- Content and presentation logic can be reviewed in version control.

### Trade-offs

- Some composition and interface state remain concentrated in `src/App.tsx`.
- Updating bundled content requires a new build and deployment.
- Browser preferences are local to the visitor's browser, not synchronized between devices.

## Verification and References

- [Application entry](../../src/main.tsx) and [composition](../../src/App.tsx)
- [Typed portfolio data](../../src/data/) and [components](../../src/components/)
- [Global styling](../../src/index.css) and [package manifest](../../package.json)
- [Architecture guide](../architecture.md)

This ADR describes the **portfolio's own architecture**. Other projects showcased in portfolio cards can have different stacks and deployment models.
