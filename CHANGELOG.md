# Changelog

Notable changes to Developer Portfolio are recorded here in human-readable form.
GitHub Issues and Pull Requests remain the source of truth for individual changes.
Entries below describe the implemented project, not additional release tags.

## Unreleased

### R7 — consolidated evidence (merged November 12, 2026)

- Add OpenAPI and Nginx to the bilingual catalog (38 entries); promote Docker to implemented and extend Playwright, Vitest, QA and CI/CD evidence.
- Refresh Adventure Files details with 358 approved checks and separately verified API Docker; update chart from the dated repository inventory (other project counts unchanged).
- [PR #118](https://github.com/AlexandroLeao/developer-portfolio/pull/118) merged as `b3d3f90` (November 12, 2026). Corrected head `beaae21` passed [CI](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952577) (**74 Vitest tests / 14 files**, lint/build), [Playwright](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952037) (**21/21**: 10 functional and 11 axe-core, 31.1s), [Lighthouse](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952404) (both profiles, three samples each, configured assertions) and [Docker](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952375). [Post-merge Docker](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43243406342) passed: Nginx 1.30.6, UID 101, 27,523,076-byte image, static assets and both PDFs HTTP 200, missing paths 404. Vercel reported success.
- Fix the existing QA association regression by restoring the explicit automated-tests phrase in bilingual project copy; retain all tests. Both development scopes are complete; R2 published smoke is maintenance and external contribution is deferred.
- P6 [PR #116](https://github.com/AlexandroLeao/developer-portfolio/pull/116) merged with verified local/CI Nginx container, separate from Vercel. No redesign or new runtime dependencies.

### Added

- Introduce P4 Lighthouse CI for production-build mobile/desktop audits (three samples each), advisory median category thresholds, enforced metadata checks, and seven-day GitHub Actions HTML/JSON artifacts without external upload (Issue #109, merged PR #110; mobile/desktop GitHub Actions jobs passed).
- Add development-only `@axe-core/playwright` WCAG A/AA checks for PT/EN homepages, themes, contact/project/certification dialogs, and a 375px viewport (Issue #107, PR #108; 11 axe audits and 10 functional E2E tests passed).
- Expand Playwright browser regression coverage from 5 to 10 Chromium scenarios, adding keyboard/focus checks, PT/EN link targets, reduced-motion behavior, and viewport overflow; add a `test:e2e` npm script (Issue #105).
- Expand the technology catalog from 30 to 36 entries across six categories, including Angular, jQuery, Supabase, Vitest, Playwright, and UX/UI Design (Issue #97).
- Add compact bilingual evidence badges for implemented work, completed study, ongoing study, and future plans; introduce a dedicated Quality & Testing category.
- Add five Playwright Chromium end-to-end tests for language switching, themes, project details, Portuguese/English resume downloads, and mobile navigation, with a dedicated Pull Request GitHub Actions workflow (Issue #99, PR #100).

### Changed

- Fix accessible-name matching for the site logo, footer back-to-top link, timeline buttons and contact links, preserving visible layouts (Issue #107).

- Replace misleading third-party tool logos on general AI, SQL, QA, and Scrum concepts with accurate neutral icons; use lightweight brand vectors for TanStack, Zod, and new supported technologies.
- Keep the technology cards compact while adapting desktop columns to the new category sizes and reusing the existing detail-panel space for a selection prompt.
- Clarify course-backed versus project-backed descriptions, including FIAP Cloud DevOps coverage and the in-progress Java bootcamp.

### Performance and testing

- Use Vitest's `vmThreads` pool while preserving per-file test isolation. In Google Cloud Shell, the 71-test suite completed in 15.27–15.79 s of wall-clock time after configuration, compared with a 38.11 s default-pool baseline. These measurements are environment-specific; see [Performance and Quality](docs/performance-and-quality.md) and Issue #101.
- Verify the expanded 36-item technology catalog with 72 passing Vitest tests across 14 files; GitHub Actions CI and Playwright browser E2E checks passed for PR #103.
- Record the owner's 2026-11-11 post-merge manual QA confirmation for mobile/desktop layouts, both languages and themes, keyboard/reduced-motion behavior, external links, and PT/EN résumé downloads (Issue #97). The checklist is owner-reported, not an independent accessibility certification or new PageSpeed audit.

### Documentation

- After owner-merged PR #112 (`main` `d0b50e4`), inspect all six original Lighthouse CI JSON reports and record sourced medians: mobile Performance **97**, desktop **98**, other categories **100**. Archive dated metadata and ZIP fingerprints in `docs/evidence/lighthouse-ci-2026-11-11.md`; the 2026-11-09 PageSpeed 100/100 report remains owner-reported without its original export.
- Add a checked P1–P5 / R1–R7 / O1–O3 engineering roadmap, with P5 and RPG R6 explicitly optional, and synchronize README, architecture, contribution guidance and the quality guide. No application/runtime changes.

- Reconcile the completed P1–P4 portfolio checks and preserve the approved next phases: Adventure Files R1–R6 (with R6 optional), one post-RPG portfolio update (R7), and only then an external open-source contribution (O1–O3). The accepted RPG MVP is not the same as implementing R1–R6.
- Correct the release process description to acknowledge the already-published `v1.0.0` and add a dated CI/CD ADR addendum for the final 21-browser-test and Lighthouse workflow baselines.

- Refresh technical documentation, use cases, and architecture to match the post-release application.
- Record performance evidence provenance and a repeatable quality-check procedure.
- Link the merged catalog update (PR #103) and preserve the manual QA evidence and limitations in the [quality guide](docs/performance-and-quality.md).

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
