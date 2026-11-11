# Changelog

Notable changes to Developer Portfolio are recorded here in human-readable form.
GitHub Issues and Pull Requests remain the source of truth for individual changes.
Entries below describe the implemented project, not additional release tags.

## Unreleased

### Added

- Add five Playwright Chromium end-to-end tests for language switching, themes, project details, Portuguese/English resume downloads, and mobile navigation, with a dedicated Pull Request GitHub Actions workflow (Issue #99, PR #100).

### Documentation

- Refresh technical documentation, use cases, and architecture to match the post-release application.
- Record performance evidence provenance and a repeatable quality-check procedure.

## Post-v1.0.0 improvements — 2026-11-09

### Added

- Three-frame, responsive WebP Hero mascot: two alternating full-character poses produce a stop-motion wave, and clicking or tapping temporarily shows a separate reaction pose.
- Subtle, reversible section-reveal animations for scrolling in either direction, with reduced-motion support.
- Mobile horizontal selection controls that gently center the chosen technology, experience, project, or certification category.
- Structured project-details dialogs with implementation context and visual references; project technology distribution charts.
- A related-project action from the relevant experience entry that selects the correct mobile project panel or targets its desktop card.
- Portuguese and English PDF résumé downloads.

### Changed

- Keep the main page width fixed on mobile while selection tracks scroll horizontally within their own containers.
- Display one selected project at a time on mobile and all project cards in a desktop grid.
- Show three curated featured qualifications on both desktop and mobile: Software Engineering, Full-Stack Web Development Bootcamp, and Cloud Fundamentals/Administration/Solution Architect. The complete catalog and knowledge-area filters remain available.
- Harmonize certification descriptions, competency chips, action alignment, and dialog spacing across cards.
- Balance project visual-reference tiles and arrange six named inspirations as two rows of three.
- Slow and soften scroll-reveal motion with smaller vertical travel and gentle staggering.
- Refine the Hero's background glow and align the character frames to avoid stationary overlays, mismatched sizing, and image seams.

### Quality and performance

- Serve the mascot and project illustrations as viewport-appropriate WebP assets alongside self-hosted fonts and an optimized icon subset.
- Expand automated coverage to **71 passing tests across 14 test files** at the 2026-11-09 baseline.
- The project owner reported **100/100 in all four Google PageSpeed Insights categories** after the improvements on 2026-11-09. The report URL and device profile are not archived in the repository; see [Performance and Quality](docs/performance-and-quality.md).

### Traceability

- Latest visual-reference, featured-certification, and motion refinements: [Issue #93](https://github.com/AlexandroLeao/developer-portfolio/issues/93) / [PR #94](https://github.com/AlexandroLeao/developer-portfolio/pull/94).
- Earlier refinements are traceable through the repository's [closed Issues](https://github.com/AlexandroLeao/developer-portfolio/issues?q=is%3Aissue+is%3Aclosed) and [merged Pull Requests](https://github.com/AlexandroLeao/developer-portfolio/pulls?q=is%3Apr+is%3Amerged).

## v1.0.0 — First stable release

- Launched the bilingual React/TypeScript portfolio with professional sections, light/dark themes, responsive navigation, and accessible contact channels.
- Published the static site through Vercel and connected `alexandroleao.com.br`.
- Established GitHub Issues, code review, CI, and Preview/Production deployment workflows.

See the [v1.0.0 GitHub release](https://github.com/AlexandroLeao/developer-portfolio/releases/tag/v1.0.0) for the official version record.
