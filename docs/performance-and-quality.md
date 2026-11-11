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
| Fonts and icons | Self-host Inter/Outfit and a reduced Devicon subset. | `public/fonts/`, `src/styles/` |
| Mobile layout | Keep horizontal choices in bounded scroll containers, with one visible project panel at a time. | `src/App.tsx`, `src/components/ExperienceTimeline.tsx`, `src/utils/centerMobileSelection.ts` |
| Motion | Use small CSS opacity/translation transitions and `IntersectionObserver`, respecting reduced-motion preferences. | `src/App.tsx`, `src/index.css` |
| Delivery | Build a static application and deploy it through Vercel. | `vite.config.ts`, `.github/workflows/ci.yml` |

These practices help contain asset and layout costs; they are not substitutes for profiling or field measurements. No specific byte savings, Core Web Vitals values, or Lighthouse run configuration are asserted here without supporting output.

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

7. Verify that the [Playwright E2E Tests workflow](../.github/workflows/playwright.yml) passes on the Pull Request. It checks five real-browser journeys using headless Chromium. For optional local execution, run `npx playwright install chromium` and then `npx playwright test`; on resource-constrained environments, prefer CI instead.
8. Attach audit links/screenshots to the relevant Issue or PR and note which results were reproduced directly versus reported by someone else.

## Interpretation

- Lighthouse/PageSpeed scores can vary with deployment content, test environment, throttling, and service updates.
- A 100/100 Accessibility score does **not** establish WCAG conformance and does not replace assistive-technology testing.
- Automated tests cover expected behavior but do not replace visual regression testing, real-device interaction checks, or production monitoring.
- Use a dated result and evidence link when quoting performance scores in a résumé, README, release, or case study.
