# Changelog

Notable changes to **Developer Portfolio** are recorded here. The file follows the spirit of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) while distinguishing **post-release changes** from officially published version tags. Issues and Pull Requests provide the detailed implementation record.

## [Unreleased]

### Documentation

- Standardize the README, documentation navigation, portfolio-specific roadmap, contribution guidance, architecture/quality descriptions and CI/CD decision record.
- Separate historical evidence from current operational instructions and remove cross-repository planning from portfolio documentation.
- Clarify documentation-only review and validation without modifying application code or CI workflows.

These documentation edits do not imply a new application release or a new quality audit.

## 2026-11-12 — Post-release portfolio updates

### Added

- Optional multi-stage Docker build with a non-root Nginx static runtime and HTTP smoke check, independent of Vercel hosting ([PR #116](https://github.com/AlexandroLeao/developer-portfolio/pull/116)).
- OpenAPI and Nginx technology entries in the bilingual catalog; updated catalog evidence descriptions and regression coverage ([PR #118](https://github.com/AlexandroLeao/developer-portfolio/pull/118)).

### Changed

- Refresh selected **portfolio project descriptions and stack-chart associations**, including the featured Adventure Files project, as application content. The showcased project's own delivery process is outside the scope of this changelog.
- Correct bilingual QA wording after a regression test identified an omitted phrase; the corrected PR passed before merge ([PR #118](https://github.com/AlexandroLeao/developer-portfolio/pull/118)).
- Update Portuguese and English résumé PDF assets ([PR #122](https://github.com/AlexandroLeao/developer-portfolio/pull/122)).
- Complete portfolio documentation closeout ([PR #120](https://github.com/AlexandroLeao/developer-portfolio/pull/120)).

### Verification

- The corrected R7 PR head passed CI with **74 Vitest tests across 14 files**, **21 Chromium Playwright scenarios** (10 functional and 11 axe-core), Lighthouse checks and Docker smoke. These are **dated 2026-11-12 results**, not guaranteed current totals. Sources: [CI](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952577), [Playwright](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952037), [Lighthouse](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952404), [Docker](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952375).
- No independent, later production-site visual audit or new numerical Lighthouse baseline is claimed here.

## 2026-11-11 — Automated quality and verification

### Added

- Ten Chromium functional browser scenarios covering language/theme changes, dialogs, résumé downloads, mobile navigation, keyboard focus, reduced motion, links and horizontal overflow ([PR #100](https://github.com/AlexandroLeao/developer-portfolio/pull/100), [PR #106](https://github.com/AlexandroLeao/developer-portfolio/pull/106)).
- Eleven automated axe-core accessibility checks on representative interface states ([PR #108](https://github.com/AlexandroLeao/developer-portfolio/pull/108)).
- Lighthouse CI on the local production build, collecting three runs per device profile and retaining reports for seven days ([PR #110](https://github.com/AlexandroLeao/developer-portfolio/pull/110)).
- Historical Lighthouse evidence archive, including inspected mobile/desktop medians and provenance ([evidence record](docs/evidence/lighthouse-ci-2026-11-11.md)).

### Changed

- Correct accessible-name mismatches without redesigning the interface.
- Expand the technology catalog with evidence labels for implemented, studied, studying and planned tools ([PR #103](https://github.com/AlexandroLeao/developer-portfolio/pull/103)).
- Configure the Vitest `vmThreads` pool; environment-specific timings are in [Performance and Quality](docs/performance-and-quality.md).

### Documentation

- Clarify historical PageSpeed results, limitations of automated accessibility checks and the difference between local Lighthouse audits and public-site performance.

## 2026-11-09 — Interface and performance refinements

### Added

- Optimized full-frame Hero mascot animation with an interactive reaction pose.
- Responsive project/detail interactions, horizontal selection tracks and related-project navigation.
- Language-specific PDF résumé downloads and curated certification presentation.
- Reduced-motion-aware section reveals and responsive WebP asset variants.

### Changed

- Improve mobile viewport containment, certification card consistency, and locally hosted fonts/icons.
- Expand application and component regression tests.

### Evidence boundary

The owner reported 100/100 in four PageSpeed Insights categories on 2026-11-09, but the original report URL and device profile are not archived. This remains a **historical owner-reported observation**, not an independent or current measurement. See [Performance and Quality](docs/performance-and-quality.md).

## [1.0.0] — First stable release

- Publish the bilingual responsive React/TypeScript portfolio with project, experience, technology, education, certification and contact sections.
- Deploy to Vercel Production and connect `alexandroleao.com.br`.
- Establish GitHub issue tracking, Pull Request review, automated CI and Preview/Production deployment.

**Official release:** [v1.0.0](https://github.com/AlexandroLeao/developer-portfolio/releases/tag/v1.0.0).
