# Cross-Project Engineering Roadmap — updated 2026-11-12

**Source:** original 2026-11-10 plan, revised by owner on 2026-11-12.  
**Status:** portfolio P1–P4 and RPG R1–R5 completed; RPG documentation closed in PR #52, main `3fe824b`. R2 published header smoke remains maintenance; R6 deferred. P6 Docker/Nginx completed and merged in PR #116; R7 consolidated refresh merged in PR #118; both development scopes are complete. Only this documentation closeout awaits owner review. External contribution is not in the active plan.  
**Portfolio verified implementation baseline:** main `b3d3f90` after [PR #118](https://github.com/AlexandroLeao/developer-portfolio/pull/118); earlier `efbc6a0` after [PR #116](https://github.com/AlexandroLeao/developer-portfolio/pull/116); prior `0d07a97` after [PR #114](https://github.com/AlexandroLeao/developer-portfolio/pull/114).

## Guardrails

- Portfolio P1–P4, P6 and R7 and RPG R1–R5 are complete. P5 and R6 are deferred. Discuss other ideas before starting any new project. External contribution is deferred outside this plan.
- Keep existing visual identity, PT/EN, accessibility, and deployments; no unrelated redesign, new project, or framework swap merely to add résumé keywords.
- Prefer **R$ 0 new service cost**; avoid AWS charges, paid GitHub runners, new paid accounts, production-data experiments, and automatic upgrades.
- Track substantial work by **Issue → branch → tests → Pull Request → owner review/merge**; never auto-merge.
- Describe tooling as **implemented**, **studied**, **studying**, or **planned** using repository/course evidence; do not overstate experience.

## Stage 1 — Developer Portfolio (complete except evidence limitation)

### P1 — Technical accuracy, content and quality evidence

- [x] Owner-reported manual PT/EN, light/dark, mobile/tablet/desktop, keyboard/reduced motion, contact/project links, and both résumé-download checks ([Issue #97](https://github.com/AlexandroLeao/developer-portfolio/issues/97)).
- [x] Replace generic REST's misleading FastAPI icon; correct other concept-vs-brand icon associations ([PR #98](https://github.com/AlexandroLeao/developer-portfolio/pull/98), [PR #103](https://github.com/AlexandroLeao/developer-portfolio/pull/103)).
- [x] Expand and audit technology catalog from **30 to 36 entries in 6 categories**, with bilingual evidence states (implemented/studied/studying/planned). The 6 additions: Angular, jQuery, Supabase, Vitest, Playwright, UX/UI Design ([PR #103](https://github.com/AlexandroLeao/developer-portfolio/pull/103)).
- [x] Explain that technology pie charts use **manually maintained 2026-11-07 source-file associations**, not live language percentages ([quality guide](performance-and-quality.md)).
- [x] Preserve the previously reported 2026-11-09 PageSpeed scores as **historical owner-reported**, not a perpetual guarantee.
- [x] Inspect and summarize the **original PR #112 Lighthouse CI artifacts**: mobile Performance median **97**, desktop **98**, other categories **100** ([evidence](evidence/lighthouse-ci-2026-11-11.md)).
- [ ] **Historical evidence still unavailable:** original 2026-11-09 PageSpeed report URL/export/profile. Do not mark the historical raw-archive task complete without the original source.
- [x] Preserve existing cards, motion design, bilingual content, and UI instead of redesigning without evidence.

### P2 — Playwright browser E2E ([PR #100](https://github.com/AlexandroLeao/developer-portfolio/pull/100), [PR #106](https://github.com/AlexandroLeao/developer-portfolio/pull/106))

- [x] Add `@playwright/test` and `npm run test:e2e` separate from Vitest.
- [x] Add **10 Chromium functional browser tests** covering language, theme, résumé downloads, dialogs/focus, mobile navigation, reduced motion, link destinations, and horizontal overflow (375/768/1280px).
- [x] Run automated browser suite on standard GitHub Actions runner; review successful [PR #112 Playwright run](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43116965506).
- [ ] This review did not independently rerun the full browser suite on a local machine. This is **not a release blocker** because the PR runner succeeded.

### P3 — axe-core accessibility automation ([PR #108](https://github.com/AlexandroLeao/developer-portfolio/pull/108))

- [x] Add development-only `@axe-core/playwright` audits.
- [x] Add **11 Chromium WCAG A/AA rule audits** for PT/EN homes, themes, dialogs, and mobile; fix observed accessible-name mismatches.
- [x] Keep results separately framed from full WCAG certification, real screen-reader testing, and real-device usability.

### P4 — reproducible Lighthouse CI ([PR #110](https://github.com/AlexandroLeao/developer-portfolio/pull/110))

- [x] Add a separate Lighthouse workflow for built Vite `dist/`, using **3 mobile + 3 desktop samples**.
- [x] Enforce metadata/viewport checks, use advisory median thresholds, and archive HTML/JSON outputs for **7 days** on GitHub Actions.
- [x] Confirm CI mobile/desktop jobs pass; independently inspect PR #112 JSON artifacts and document all 6 scores, test URLs, timestamp, version, hashes and limitations.
- [x] Preserve optimized assets and avoid changes solely to chase perfect scores.

### P5 — optional cross-browser / visual regression

- [x] Evaluated as **optional, not required** for closing P1–P4 (Chromium, Vitest, axe-core and Lighthouse CI already cover agreed scope).
- [ ] Firefox/WebKit coverage **not implemented**; revisit if a reproducible cross-browser issue justifies it.
- [ ] Visual snapshot regression **not implemented**; revisit if a stable target and maintenance cost justify it.

### Stage 1 exit gate

- [x] Owner merged P1–P4 implementation PRs and closure [PR #112](https://github.com/AlexandroLeao/developer-portfolio/pull/112); latest pre-merge CI, Playwright, Lighthouse and merge-commit Vercel status succeeded.
- [x] No portfolio Issues or PRs remained open immediately after merging #112.
- [x] Post-merge documentation/evidence follow-up [Issue #113](https://github.com/AlexandroLeao/developer-portfolio/issues/113) closed by owner-merged [PR #114](https://github.com/AlexandroLeao/developer-portfolio/pull/114).
- [ ] Direct independent inspection of the published site was **not performed**; do not imply it from a deployment success status.

## Stage 2 — Adventure Files (closed development scope)

- [x] R1: [PR #42](https://github.com/AlexandroLeao/rpg-character-creator/pull/42), technical baseline.
- [x] R2: [PR #44](https://github.com/AlexandroLeao/rpg-character-creator/pull/44), private no-store/error logs, CI and local container verified. Published Render/proxy smoke remains pending maintenance.
- [x] R3: [PR #46](https://github.com/AlexandroLeao/rpg-character-creator/pull/46), OpenAPI 3.1 and 16 contract cases.
- [x] R4: [PR #48](https://github.com/AlexandroLeao/rpg-character-creator/pull/48), API Docker and isolated pgTAP.
- [x] R5: [PR #50](https://github.com/AlexandroLeao/rpg-character-creator/pull/50), 3 full-stack Chromium scenarios with disposable local accounts.
- [x] Final documentation [PR #52](https://github.com/AlexandroLeao/rpg-character-creator/pull/52), main `3fe824b`. All five main workflows passed: [frontend 183](https://github.com/AlexandroLeao/rpg-character-creator/actions/runs/43238851257), [API 133 + 2 opt-in skipped](https://github.com/AlexandroLeao/rpg-character-creator/actions/runs/43238851435), [pgTAP 39](https://github.com/AlexandroLeao/rpg-character-creator/actions/runs/43238851449), [E2E 3](https://github.com/AlexandroLeao/rpg-character-creator/actions/runs/43238851478), [Docker smoke](https://github.com/AlexandroLeao/rpg-character-creator/actions/runs/43238851482). Total 358 distinct tests/assertions across suites, not a coverage percentage.
- [x] R6 deferred by owner decision to close development; no CSP, limiter, observability or new features implemented.
- [ ] Operational follow-up only: verify hosted GET health 200, private GET 401/no-store directly on Render and via Vercel; no credentials or real data. CI is not hosted verification.

No runtime hosting change or authenticated API-container-to-Supabase test is claimed. See [RPG roadmap](https://github.com/AlexandroLeao/rpg-character-creator/blob/main/docs/post-mvp-engineering.md).

## Stage 3 — Portfolio final update

### P6 — local static Docker/Nginx (completed)

- [x] Add multi-stage Node 24/Vite build and non-root Nginx static runtime; restrict context; healthcheck.
- [x] Add Docker smoke and separate CI, local instructions; unchanged Vercel deployment.
- [x] [PR #116](https://github.com/AlexandroLeao/developer-portfolio/pull/116) merged; Issue #115 closed. All four PR workflows and Vercel passed. [Docker main](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43241020881) passed with Nginx 1.30.6, non-root UID 101, 27,521,986 bytes, correct static assets/PDFs and 404s.

### R7 — one consolidated portfolio evidence refresh

- [x] Implement consolidated PT/EN RPG details, Docker/OpenAPI/Playwright chart associations and documented count provenance. Docker promoted to implemented; OpenAPI and Nginx added, 38 entries total. Playwright/Vitest/QA/CI descriptions refreshed. Issue #117 closed; PR #118 merged.
- [x] [PR #118](https://github.com/AlexandroLeao/developer-portfolio/pull/118) merged as `b3d3f90` (November 12, 2026). Corrected head `beaae21` passed [CI](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952577) (**74 Vitest tests / 14 files**, lint/build), [Playwright](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952037) (**21/21**: 10 functional and 11 axe-core, 31.1s), [Lighthouse](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952404) (both profiles, three samples each, configured assertions) and [Docker](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952375). [Post-merge Docker](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43243406342) passed: Nginx 1.30.6, UID 101, 27,523,076-byte image, static assets and both PDFs HTTP 200, missing paths 404. Vercel reported success. No redesign or changes to unrelated projects.
- [x] Initial [CI failure](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43241832195) was a QA text-association regression (73/74); restored the explicit automated-tests phrase in both languages in `beaae21`, without weakening tests. Corrected CI passed.
- [ ] Owner review/merge of this documentation-only closure (Issue #119). This is not additional development scope.

## After the sequence

- [ ] Discuss and prioritize new ideas with owner before implementation. Next.js, NestJS, Python/FastAPI and cloud fundamentals remain candidates, not commitments.
- [ ] Refresh PT/EN résumé and LinkedIn when agreed, using verified evidence.
- External open-source contribution is outside the active roadmap; revisit only if the owner requests it.
