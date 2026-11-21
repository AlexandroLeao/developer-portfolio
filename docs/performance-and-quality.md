# Performance and Quality — Developer Portfolio

## Purpose and Evidence Policy

This guide explains how quality is checked **for Developer Portfolio**, what the existing automation covers, and how to interpret historical results. It does not document the development or operations of applications showcased in portfolio cards.

**Evidence rules:** always distinguish an inspected report, a successful CI status, a manual owner report, and an unverified claim. Date numerical results; identify the tested commit, environment and profile when known. Historical values are **not current guarantees**.

## Automated Validation

| Layer | Entry point | Scope | Important limitation |
| --- | --- | --- | --- |
| Lint and type/build | `npm run lint`, `npm run build` | ESLint, TypeScript and Vite output | Does not verify browser rendering |
| Unit/component | `npm run test` | Vitest with React Testing Library and jsdom | Does not replicate all real browsers |
| Browser E2E | `npm run test:e2e` | Playwright Chromium; navigation, themes, dialogs, links and downloads | Other browser engines are not configured |
| Automated accessibility | Same Playwright command | axe-core WCAG A/AA rule checks on representative states | Does not certify WCAG conformance |
| Lighthouse CI | `.github/workflows/lighthouse.yml` | Local static production build; mobile and desktop | Not the public site or field Core Web Vitals |
| Docker smoke | `bash docker/smoke.sh` | Optional non-root Nginx static image, routes and assets | Not a production container deployment |

The [four workflows](../.github/workflows/) run independently on pull requests targeting `main`; Docker also runs on configured `main` push paths. The workflows use Node.js 24 where relevant. A documentation-only edit can be reviewed with path, Markdown and consistency checks; **do not claim application tests were run unless they were executed**.

### Recommended Local Checks for Code Changes

```bash
npm ci
npm run lint
npm run test
npm run build
```

For browser-affecting changes, install Chromium locally if necessary and run `npm run test:e2e`, or rely on the appropriate PR workflow when local resources are constrained.

### Lighthouse Setup

- CLI: `@lhci/cli@0.16.0`, configured in [lighthouserc.cjs](../lighthouserc.cjs).
- Input: locally served compiled `dist/` from Vite.
- Profiles: three mobile and three desktop samples in separate GitHub Actions matrix jobs.
- Advisory median thresholds: Performance **0.85**, Accessibility **0.95**, Best Practices **0.90**, SEO **0.90**.
- Enforced checks: document title, description, viewport-related metadata and successful collection.
- Storage: filesystem reports uploaded as GitHub Actions artifacts with **seven-day retention**; no third-party Lighthouse server.

Reproduction requires Node.js 24 and Chrome:

```bash
npm ci
npm run build
npm install --global @lhci/cli@0.16.0
LHCI_DEVICE=mobile lhci autorun
# Archive the first profile's report files before running the next.
LHCI_DEVICE=desktop lhci autorun
```

Category scores are **warnings**, not hard pass/fail budgets. The workflow can still fail because collection or enforced metadata checks fail. Audit numbers vary with Chrome, runner load and simulation settings.

## Dated Verification Baselines

| Date / source | Observation | Verification boundary |
| --- | --- | --- |
| 2026-11-12 — [PR #118 CI](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952577) | **74 passing Vitest tests in 14 files**, lint and build passed | Corrected PR head `beaae21`; historical |
| 2026-11-12 — [PR #118 Playwright](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952037) | **21 Chromium checks**: 10 functional E2E and 11 axe-core | Historical, one browser engine and representative cases |
| 2026-11-12 — [Docker post-merge](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43243406342) | Static image smoke passed, including HTML/assets, both résumé PDFs and missing-path 404s | Local/CI container, **not** Vercel origin |
| 2026-11-11 — [PR #112 Lighthouse raw-report inspection](evidence/lighthouse-ci-2026-11-11.md) | Median Performance **97 mobile / 98 desktop**; other category medians **100** | Three runs per profile on a local CI build; reports have expired from Actions |
| 2026-11-11 — owner-reported Cloud Shell Lighthouse | Median Performance **96 mobile / 100 desktop**; other category medians **100** | Owner's local output; original JSON files are not preserved in this repository |
| 2026-11-09 — owner-reported PageSpeed Insights | **100/100** in Performance, Accessibility, Best Practices and SEO | Original URL, device mode and report export **not archived**; not independently verified |

The [dated Lighthouse evidence file](evidence/lighthouse-ci-2026-11-11.md) preserves the six CI sample scores, report timestamps, version information, source run, ZIP hashes, report expiry and limitations. Do not treat an expired artifact link as currently downloadable.

Later successful workflows or deployments do not establish a later **numerical** Lighthouse score unless the corresponding reports are actually inspected. Successful Vercel status likewise does not prove a complete live-site visual audit.

## Test Coverage and Accessibility Boundaries

### Vitest

The suite covers core application components and data relationships, including language/theme behavior, dialogs, navigation, portfolio content, the Hero mascot, certification filtering and mobile selection helpers. The `vmThreads` pool is configured in [vite.config.ts](../vite.config.ts). A historical 2026-11-11 Cloud Shell comparison of the 71-test baseline reported wall-clock times of **38.11 seconds** for the default pool and **15.27–15.79 seconds** for two configured runs. This was a machine-specific test-runner observation, **not** application runtime performance; it should not be extrapolated to future environments.

### Playwright and axe-core

- Functional browser tests cover representative language/theme changes, project details, PT/EN résumé downloads, mobile navigation, keyboard-operated dialogs, link targets, reduced motion and horizontal overflow.
- Automated axe-core tests inspect representative PT/EN homepage/theme states, selected dialogs and mobile layout under applicable WCAG Level A/AA rule tags.
- Tests inspect external link destinations but do not operate other services or authenticate against showcased applications.
- Automated audits do **not** prove complete WCAG conformance, screen-reader experience, cross-browser consistency or third-party availability.

### Performance-Oriented Implementation

| Technique | Implemented location |
| --- | --- |
| Responsive WebP artwork and full-frame mascot poses | `public/images/`, `src/components/HeroMascot.tsx` |
| Locally hosted fonts and icon subset | `public/fonts/`, `src/styles/`, `src/components/TechnologyIcon.tsx` |
| Contained mobile horizontal selectors | `src/App.tsx`, `src/utils/centerMobileSelection.ts` |
| Reduced-motion-aware reveals | `src/App.tsx`, `src/index.css` |
| Static Vite build served by Vercel | `package.json`, `vite.config.ts` |

The architecture itself does not guarantee a specific Core Web Vitals or Lighthouse result.

## Portfolio Chart-Data Provenance

The project charts in the portfolio use `stackFileCounts` entries from [src/data/projects.ts](../src/data/projects.ts). They are **manually curated file/tool associations**, can overlap across technologies, and are not automatically scanned on each page load. They must not be described as exclusive language percentages, coverage metrics or real-time repository statistics.

The chart for the featured Adventure Files project was refreshed on **2026-11-12** from an identified snapshot of that project's source tree; other displayed project charts retained an earlier **2026-11-07** inventory. This statement explains **portfolio display data only**. The referenced application's test plan, infrastructure, maintenance and release history belong to its own repository.

## Manual QA and New Measurement Procedure

1. Identify the exact portfolio commit/deployment and environment under review.
2. Review a mobile and a desktop viewport, both languages and themes, keyboard focus and dialogs, external-link destinations, résumé downloads, and `prefers-reduced-motion`.
3. Verify horizontal overflow and important visual states on supported device sizes; perform screen-reader testing when claiming accessibility readiness.
4. For public-site performance claims, run PageSpeed Insights or Lighthouse against the **intended deployment URL** for each relevant device profile. Save the report URL or JSON, run date, tested URL, browser settings and scores.
5. For built-site CI claims, cite the specific workflow run and **inspected artifact**; do not substitute deployment status for an audit.
6. Preserve links, screenshots and limitations in the related portfolio Issue/PR or in a dated evidence document.

## Interpretation and Further Reading

- Historical results are retained for traceability, not promises about the current deployed page.
- A perfect accessibility audit score is **not** WCAG certification; manual and assistive-technology checks remain necessary.
- Reports can vary by browser version, runner conditions, simulated network and device profile.
- The optional Docker/Nginx smoke path is separate from public Vercel hosting.

See the [evidence archive](evidence/lighthouse-ci-2026-11-11.md), [architecture](architecture.md), [roadmap](engineering-roadmap.md) and [documentation index](README.md).
