# ADR 0004: Accessible Motion and Viewport-Safe Mobile Navigation

## Status

Accepted — documented retrospectively on 2026-11-09.

## Context

The portfolio combines a distinctive illustrated Hero, several option-heavy sections, and project/certification cards. Iterative visual testing exposed several risks:

- Cropping, size/color mismatch, and layered artifacts when a mascot's hand was animated independently of the character.
- Horizontal page expansion when mobile option lists were not contained within their section.
- Uneven card spacing and dense content competing with visual hierarchy.
- Section entrances that felt abrupt or distracting when scrolling in either direction.

The goal was to preserve the approved visual style while improving consistency, legibility, and interaction clarity.

## Decision

1. **Use full-frame stop motion.** Render two matching, optimized whole-character WebP frames for the repeating wave. Temporarily replace the wave with a dedicated complete click/tap reaction frame. Do not animate isolated limb cutouts or leave the static pose visible behind another frame.
2. **Contain mobile selection tracks.** Keep page sections viewport-safe; allow internal horizontal scrolling for technology, experience, project, and certification choices. Gently center the selected control through the shared `centerMobileSelection` helper. Show one project panel at a time on mobile and a multi-card grid on desktop.
3. **Keep certification information predictable.** Present three curated default highlights on desktop and mobile, with explicit access to all qualifications and category filters. Align card action areas and center skill chips while preserving their headings.
4. **Use restrained reveal motion.** Animate section opacity and a small vertical offset with reversible CSS transitions driven by `IntersectionObserver`. Respect `prefers-reduced-motion`, avoid layout-changing transforms, and keep motion independent from content visibility when animation is disabled.

## Rationale

Full frames preserve the character's proportions, shadows, and lighting. Contained selection tracks keep narrow screens stable. Shared, subtle interactions reduce visual noise and make repeated controls predictable. Reduced-motion handling prevents movement from becoming a barrier to reading the site.

## Consequences

### Benefits

- Consistent character imagery and a recognizable, lightweight stop-motion gesture.
- Mobile navigation without unintended horizontal page overflow.
- More regular project, experience, and certification presentation.
- Less abrupt scroll effects with an accessible reduced-motion path.

### Trade-offs

- Full-frame animation requires multiple optimized image assets and careful frame alignment.
- A selected mobile item may not be exactly centered at a scroll boundary; adjacent options must remain discoverable.
- Viewport-driven reveals require lifecycle cleanup and careful behavior when motion is disabled or observation is unsupported.
- The default three-item certification selection requires a visible route to the complete catalog.

## Validation

- Component and application tests exercise mascot behavior, responsive selection state, project details, certification filtering, and related-project navigation.
- ESLint, TypeScript/Vite build, and automated tests run in GitHub Actions for pull requests.
- Manual review should include narrow viewports, both languages/themes, keyboard focus, and reduced-motion mode.
- The project owner reported PageSpeed Insights 100/100 across four categories on 2026-11-09 after the refinements. See [Performance and Quality](../performance-and-quality.md) for provenance and limitations; this is not presented as an independently reproduced ADR test.

## References

- `src/components/HeroMascot.tsx`, `src/index.css`
- `src/utils/centerMobileSelection.ts`, `src/App.tsx`
- `src/components/ExperienceTimeline.tsx`, `src/components/CertificationCard.tsx`
- [Issue #93](https://github.com/AlexandroLeao/developer-portfolio/issues/93) and [PR #94](https://github.com/AlexandroLeao/developer-portfolio/pull/94)
