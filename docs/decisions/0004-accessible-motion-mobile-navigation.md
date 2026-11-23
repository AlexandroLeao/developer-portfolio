# ADR 0004 — Accessible Motion and Viewport-Safe Mobile Navigation

**Status:** Accepted (retrospectively documented on 2026-11-09)  
**Scope:** Developer Portfolio interactions

## Context

The portfolio combines an illustrated Hero, option-heavy sections, responsive project cards and certifications. Iterative reviews identified risks of misaligned animation frames, mobile overflow, inconsistent card spacing and distracting section transitions.

The requirement was to preserve the established visual identity while improving interaction clarity and accessibility, including visitors who prefer reduced motion.

## Decision

1. **Animate whole-character frames.** Use two optimized WebP poses for a repeating stop-motion wave and a distinct frame for a temporary click/tap reaction. Avoid separately animated limbs or overlapping default poses.
2. **Constrain mobile selectors.** Keep technology, experience, project and certification selection tracks inside their sections. Scroll options horizontally and gently center the selected control with `centerMobileSelection`. Show one selected project at a time on mobile and a grid on desktop.
3. **Provide predictable qualification access.** Show three curated featured qualifications by default while exposing the full catalog and filters.
4. **Keep section reveals restrained.** Use `IntersectionObserver` plus opacity/small translation transitions. Respect `prefers-reduced-motion: reduce` and avoid content loss when motion is disabled.

## Alternatives Considered

- Animate isolated mascot layers: lighter asset reuse, but caused visible alignment problems.
- Show every item in dense mobile grids: reduced interaction state, but increased overflow and readability risk.
- Remove all animations: simple, but not required when motion can be made optional and subtle.

## Consequences

### Benefits

- Cohesive character styling and recognizable gesture.
- Mobile navigation without accidental page-wide horizontal expansion.
- Predictable card/selection behavior and full access to catalog content.
- Reduced-motion behavior without removing content.

### Trade-offs

- Whole-frame animation requires aligned responsive assets.
- Selector centering may be limited near a scroll-track boundary.
- Observer-driven transitions need lifecycle cleanup and resilient reduced-motion handling.
- Curated certification defaults must offer an obvious path to all entries.

## Verification and References

- [Hero mascot](../../src/components/HeroMascot.tsx), [global styles](../../src/index.css)
- [App interactions](../../src/App.tsx), [mobile selection helper](../../src/utils/centerMobileSelection.ts)
- [Experience timeline](../../src/components/ExperienceTimeline.tsx), [certification cards](../../src/components/CertificationCard.tsx)
- [Issue #93](https://github.com/AlexandroLeao/developer-portfolio/issues/93) and [PR #94](https://github.com/AlexandroLeao/developer-portfolio/pull/94)
- [Performance and Quality](../performance-and-quality.md) for dated observations and automation limitations

Automated checks cover relevant interaction regressions but do **not** establish full WCAG conformance. The owner's 2026-11-09 PageSpeed report is **historical and unarchived**, not an independently verified result of this ADR.
