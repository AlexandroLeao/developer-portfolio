# ADR 0003 — Local Fonts and Optimized Static Assets

**Status:** Accepted (retrospectively documented)  
**Scope:** Developer Portfolio frontend

## Context

The portfolio uses a prominent illustrated Hero, project artwork, custom typography and technology icons. Third-party font requests and oversized graphics can increase load time, especially on mobile networks. The approved design and interactions were to be preserved.

## Decision

1. Serve responsive **WebP** image variants for Hero poses and project artwork, using `srcSet`/`sizes` where applicable and suitable loading priority.
2. Self-host the Inter and Outfit WOFF2 fonts rather than loading them through a runtime external font stylesheet.
3. Serve a reduced local Devicon font/CSS subset while retaining its relevant licensing notices.
4. Use small inline vector marks for additional supported brand icons where they avoid another runtime icon dependency.

## Rationale

The browser can choose appropriate image sizes for different viewports. Local fonts reduce dependence on third-party font availability and prevent unnecessary remote stylesheet requests. A limited icon subset avoids shipping unused glyphs.

## Alternatives Considered

- Continue serving complete icon fonts and remote fonts: less local asset maintenance, but more external requests.
- Replace illustrations with generic placeholders: simpler loading, but unnecessary loss of the portfolio's approved identity.

## Consequences

### Benefits

- Fewer runtime third-party asset dependencies.
- Responsive image loading and smaller local icon payload.
- Consistent typography and preserved visual identity.

### Trade-offs

- Added maintenance of asset variants, font licensing and icon subsets.
- New supported icon entries may need source/subset updates.
- Observed performance scores depend on the test configuration and environment.

## Verification and Evidence

- Implementation: `public/images/`, `public/fonts/`, `src/styles/`, `src/components/HeroMascot.tsx`, `src/components/TechnologyIcon.tsx`.
- The owner **reported** PageSpeed Insights category scores of 100/100 on 2026-11-09; the original audit URL, device mode and export are **not archived**, so this ADR does not treat that result as independently verified.
- A separately inspected **2026-11-11 GitHub Actions Lighthouse CI** baseline is recorded in [the evidence archive](../evidence/lighthouse-ci-2026-11-11.md): median Performance **97 mobile / 98 desktop** and medians of **100** in the other categories. This measured a **local production build in CI**, not the public origin.
- See [Performance and Quality](../performance-and-quality.md) for audit limitations. Lighthouse category results do not establish WCAG conformance or guarantee future scores.

## References

- [Software architecture](../architecture.md)
- [GitHub Issues](https://github.com/AlexandroLeao/developer-portfolio/issues) (historical asset-optimization work)
