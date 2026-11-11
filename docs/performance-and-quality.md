# Performance and Quality

## Latest reported audit

On **2026-11-09**, the project owner reported running **Google PageSpeed Insights** after the recent visual and interaction updates. The owner reported the following results:

| PageSpeed Insights category | Reported score |
| --- | ---: |
| Performance | 100 / 100 |
| Accessibility | 100 / 100 |
| Best Practices | 100 / 100 |
| SEO | 100 / 100 |

**Evidence status:** owner-reported; not independently reproduced or verified for this documentation change. The PageSpeed Insights report URL/export, audited page URL, and mobile/desktop profile were not provided and are not archived here. Do not describe these scores as a new CI result or as proof that all visitors achieve the same experience.

An earlier recorded production Lighthouse result also appears in [ADR 0003](decisions/0003-local-assets-performance.md). It is a separate point-in-time measurement, not a continuous guarantee.

## Current performance-oriented implementation

| Area | Implemented practice | Source |
| --- | --- | --- |
| Hero animation | Swap three complete character frames, avoiding separately animated hand layers and permanently visible duplicate poses. | `src/components/HeroMascot.tsx`, `src/index.css` |
| Image delivery | Use responsive WebP variants for the mascot and project artwork, with appropriate loading priority. | `public/images/`, `src/components/HeroMascot.tsx`, `src/components/ProjectCard.tsx` |
| Fonts and icons | Self-host Inter/Outfit and a reduced Devicon subset; render a handful of extra brand icons as inline vectors. | `public/fonts/`, `src/styles/`, `src/components/TechnologyIcon.tsx` |
| Mobile layout | Keep horizontal choices in bounded scroll containers, with one visible project panel at a time. | `src/App.tsx`, `src/components/ExperienceTimeline.tsx`, `src/utils/centerMobileSelection.ts` |
| Motion | Use small CSS opacity/translation transitions and `IntersectionObserver`, respecting reduced-motion preferences. | `src/App.tsx`, `src/index.css` |
| Delivery | Build a static application and deploy it through Vercel. | `vite.config.ts`, `.github/workflows/ci.yml` |

These practices help contain asset and layout costs; they are not substitutes for profiling or field measurements. No specific byte savings, Core Web Vitals values, or Lighthouse run configuration are asserted here without supporting output.

The 36-item technology catalog adds six entries and a small set of inline icons
without importing a second icon library. Its post-merge layout was inspected
in production, and the owner confirmed the manual device and interaction checks
below. Older PageSpeed results are not a measurement of this change.

## Post-merge functional quality review — 2026-11-11

- **Deployment:** [PR #103](https://github.com/AlexandroLeao/developer-portfolio/pull/103) was merged into `main` as commit `fbe10d1`, and the Vercel Production deployment reported success.
- **Automated evidence:** 72 Vitest tests passed across 14 files; the PR's Continuous Integration and Playwright E2E workflows completed successfully. The browser suite covers language/theme switching, project details, PT/EN résumé downloads, and mobile navigation.
- **Production desktop inspection:** the updated technology catalog, its six categories, selected details, English translation, and dark theme were inspected in a browser. No page-wide horizontal overflow was observed at the inspected desktop width.
- **Owner-confirmed manual checks:** the owner reported successful mobile, tablet, and desktop layout checks; Portuguese/English and light/dark states; keyboard navigation and reduced-motion preference; and project, contact, certification, and résumé links/downloads. No problems were reported.

**Evidence limitations:** the manual checks above were confirmed by the owner in conversation; a device/browser matrix and supporting screenshots were not archived. The desktop inspection is not a substitute for a full device accessibility audit, and no new PageSpeed Insights or Lighthouse score is claimed for this release. This record documents the functional QA completed for [Issue #97](https://github.com/AlexandroLeao/developer-portfolio/issues/97), not formal WCAG conformance.

## Browser E2E regression expansion — 2026-11-11

Issue #105 extends the five baseline Playwright scenarios to 10 in two test files. These checks exercise keyboard focus and Escape behavior in contact/project dialogs, PT/EN contact/project link destinations without visiting external services, emulated reduced motion, and page-wide overflow at 375, 768, and 1280 px. The Chromium workflow remains separate from Vitest and uses standard GitHub Actions runners; check the associated PR for an actual passing run rather than treating the implementation alone as verification. Automated smoke tests are not a WCAG conformance audit, cross-browser guarantee, live third-party link test, or reproducible Lighthouse measurement.

## Vitest test-runner performance — 2026-11-11

This is **developer test execution time**, not the production site's runtime speed or a new Lighthouse result. The measurements below come from Google Cloud Shell terminal output for Vitest 5.0.5 and the same 71 passing tests across 14 files:

| Vitest configuration | Execution | Reported Vitest duration | Shell wall-clock time | Result |
| --- | --- | ---: | ---: | --- |
| Default pool | Baseline (`time npm test`) | 36.27 s | 38.11 s | 71/71 passed |
| `vmThreads` CLI experiment | First run | 14.93 s | 16.31 s | 71/71 passed |
| `vmThreads` CLI experiment | Second run | 17.33 s | 19.08 s | 71/71 passed |
| `vmThreads` in `vite.config.ts` | First run (`time npm test`) | 14.83 s | 15.79 s | 71/71 passed |
| `vmThreads` in `vite.config.ts` | Second run (`time npm test`) | 14.30 s | 15.27 s | 71/71 passed |

The two runs after applying the configuration were approximately **59–60% faster** than the single default-pool baseline in this environment. The default run reported 45% of tracked time in `jsdom` initialization, versus 9–13% in the configured runs. Results may vary by hardware, CI runner, and system load; the measurements do not establish a universal speedup.

The `vmThreads` pool keeps test-file VM contexts separate, but Vitest documents potential cross-realm compatibility and memory-retention limitations. The configuration does **not** disable isolation. Validate the full suite repeatedly and check GitHub Actions before merging any runner changes. See [Vitest performance guidance](https://vitest.dev/guide/improving-performance.html), [pool configuration](https://vitest.dev/config/pool), and [Issue #101](https://github.com/AlexandroLeao/developer-portfolio/issues/101).

## Reproducible audit checklist

1. Verify the intended Production or Preview deployment and its commit SHA.
2. Run [PageSpeed Insights](https://pagespeed.web.dev/) for the relevant page in **mobile and desktop** modes; save both report URLs or JSON exports.
3. Record the audit date/time, URL, device mode, four category scores, and relevant Core Web Vitals data when available.
4. Check the main interactions manually in a narrow viewport and on desktop: mascot wave/poke, category centering, project switching, certification dialogs, and scroll reveals.
5. Check Portuguese and English, light/dark themes, keyboard focus, and `prefers-reduced-motion`.
6. Run the repository's static and Vitest checks:

   ```bash
   npm ci
   npm run lint
   npm run test
   npm run build
   ```

7. Verify that the [Playwright E2E Tests workflow](../.github/workflows/playwright.yml) passes on the Pull Request. The expanded 10-scenario Chromium suite covers five original journeys plus keyboard-operated dialogs, contact/project link destinations, reduced motion, and mobile/tablet/desktop page-wide overflow. For optional local execution, run `npx playwright install chromium` and then `npm run test:e2e`; on resource-constrained environments, prefer CI instead.
8. Attach audit links/screenshots to the relevant Issue or PR and note which results were reproduced directly versus reported by someone else.

## Interpretation

- Lighthouse/PageSpeed scores can vary with deployment content, test environment, throttling, and service updates.
- A 100/100 Accessibility score does **not** establish WCAG conformance and does not replace assistive-technology testing.
- Automated tests cover expected behavior but do not replace visual regression testing, real-device interaction checks, or production monitoring.
- Use a dated result and evidence link when quoting performance scores in a résumé, README, release, or case study.
