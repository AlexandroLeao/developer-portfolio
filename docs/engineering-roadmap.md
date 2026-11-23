# Developer Portfolio — Engineering Roadmap

**Scope:** `AlexandroLeao/developer-portfolio` only  
**Reviewed against:** repository `main` as of 2026-11-21  
**Status:** original stable release and the documented portfolio quality/DevOps cycle completed; new work needs a clear scope and maintainer approval, not necessarily an Issue or PR during preparation.

This roadmap tracks **work on the portfolio application and its supporting tooling**. Descriptions of other applications showcased in portfolio cards are content references, **not tasks or milestones for those repositories**.

## Engineering Principles

- Preserve the existing bilingual interface, visual identity, accessibility behavior, and Vercel deployment unless an approved requirement changes them.
- Prefer changes with evidence-based value; do not introduce infrastructure, dependencies, or recurring cost solely for résumé keywords.
- Distinguish **implemented**, **studied**, **studying**, and **planned** technology experience.
- Define scope and acceptance criteria before editing. A docs-only branch can be prepared without an Issue or PR; integration still follows the active `main` ruleset.
- Keep dated measurements and historical test counts in the [quality guide](performance-and-quality.md); do not report them as live metrics.

## Completed Portfolio Milestones

| ID | Scope | State | Evidence |
| --- | --- | --- | --- |
| Foundation | React/TypeScript/Vite frontend, bilingual content, responsive UI, themes, static deployment | Complete | [Release v1.0.0](https://github.com/AlexandroLeao/developer-portfolio/releases/tag/v1.0.0) |
| P1 | Technology catalog accuracy, content provenance, interaction and manual quality review | Complete | [PR #103](https://github.com/AlexandroLeao/developer-portfolio/pull/103), [Quality guide](performance-and-quality.md) |
| P2 | Functional Chromium browser regression suite | Complete | [PR #100](https://github.com/AlexandroLeao/developer-portfolio/pull/100), [PR #106](https://github.com/AlexandroLeao/developer-portfolio/pull/106) |
| P3 | Development-only axe-core accessibility regression checks | Complete | [PR #108](https://github.com/AlexandroLeao/developer-portfolio/pull/108) |
| P4 | Independent Lighthouse CI jobs, mobile/desktop audit profiles and retained artifacts | Complete | [PR #110](https://github.com/AlexandroLeao/developer-portfolio/pull/110), [archived evidence](evidence/lighthouse-ci-2026-11-11.md) |
| P6 | Optional local Docker/Nginx static image and smoke verification | Complete | [PR #116](https://github.com/AlexandroLeao/developer-portfolio/pull/116) |
| R7 | Consolidated **portfolio content/catalog** update and related regression checks | Complete | [PR #118](https://github.com/AlexandroLeao/developer-portfolio/pull/118) |
| Documentation closeout | Reconcile completed portfolio implementation and documented evidence | Complete | [PR #120](https://github.com/AlexandroLeao/developer-portfolio/pull/120) |

The R7 milestone concerns **content displayed by Developer Portfolio**. It does not extend this repository's roadmap to the implementation, hosting, tests, or maintenance of showcased applications.

## Known Evidence Gaps and Optional Improvements

| Item | State | Decision boundary |
| --- | --- | --- |
| Original 2026-11-09 PageSpeed Insights export / device profile | Not archived | The original 100/100 result is owner-reported. Do not claim independent reproduction; archive the original only if later available |
| Direct production-site visual/accessibility audit for the cited historical PRs | Not independently documented | Deployment success is not proof of a complete live-site audit |
| P5: Firefox/WebKit regression coverage | Optional, not implemented | Consider only for a reproducible cross-browser issue |
| P5: Visual snapshot regression | Optional, not implemented | Requires a stable baseline and explicit maintenance-cost decision |
| Future frameworks, cloud experiments or paid services | Not approved | Scope and zero-new-cost safeguards require a separate decision |

An unchecked item here denotes a **documentation/evidence limitation or candidate**, not an automatically authorized development task.

## Next Work

Before implementing new features, agree on a **portfolio-specific** objective, record acceptance criteria in the change notes (or an optional Issue), and evaluate performance, accessibility, hosting and cost. Keep changes prepared on an isolated branch until the protected `main` integration requirements are satisfied. Résumé and external professional-profile updates require verified source material and separate approval.

## Traceability and Ownership

- [GitHub Issues](https://github.com/AlexandroLeao/developer-portfolio/issues) and [Pull Requests](https://github.com/AlexandroLeao/developer-portfolio/pulls) preserve historical reviews when used; neither is mandatory to **prepare** new documentation.
- [Changelog](../CHANGELOG.md) records user-visible and engineering changes.
- [Architecture decisions](decisions/0001-client-side-architecture.md) explain technical trade-offs.
- [Performance and Quality](performance-and-quality.md) records validation method, provenance and known limits.

This file is **not** a cross-repository program plan. Each showcased project maintains its own scope and engineering documentation.
