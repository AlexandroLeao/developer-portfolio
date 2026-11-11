# Cross-Project Engineering Roadmap — 2026-11-11

**Source:** approved 2026-11-10 portfolio → Adventure Files → external open-source plan.  
**Status:** Portfolio P1–P4 delivered and merged; historical PageSpeed raw artifact unavailable; P5 is optional/non-blocking. Next stage is **Adventure Files R1**.  
**Repository baseline:** portfolio `main` `d0b50e4` after owner-merged [PR #112](https://github.com/AlexandroLeao/developer-portfolio/pull/112) on 2026-11-11. RPG `main` `fea7ac8` (2026-11-05), accepted MVP; the later R1–R6 improvements are *not* thereby completed.

## Guardrails

- Work on the portfolio first (completed), then Adventure Files R1–R6, then **one consolidated portfolio refresh R7**, then external open-source O1–O3.
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
- [ ] This post-merge documentation/evidence follow-up is being prepared under [Issue #113](https://github.com/AlexandroLeao/developer-portfolio/issues/113) and remains subject to **owner review/merge**.
- [ ] Direct independent inspection of the published site was **not performed**; do not imply it from a deployment success status.

## Stage 2 — Adventure Files (MVP accepted; engineering improvements pending)

### R1 — Reconfirm technical state and accepted risk
- [ ] Recheck currently running frontend/API tests, DB security/pgTAP, lint/build and CI; date the results and preserve older historical counts.
- [ ] Reconfirm existing free **Vercel + Render + Supabase** setup and accepted absence of automatic Supabase Free backups. Do not access production user data or create new infrastructure.

### R2 — narrow private-response and logging checks
- [ ] Evaluate `Cache-Control: no-store` on private API responses (including direct Render access), with unit tests; verify Vercel proxy behavior.
- [ ] Review error/log handling without collecting tokens or private data; treat as defense-in-depth, not a proven vulnerability.

### R3 — machine-readable API contract
- [ ] Write/validate OpenAPI descriptions for existing auth, character CRUD, account deletion, errors, and health endpoints. Avoid duplicating or inventing API behavior.

### R4 — reproducible backend using Docker
- [ ] Add local Node/Express container setup, `.dockerignore`, non-root user when applicable, environment configuration and safe health checks.
- [ ] Document local-only Supabase integration and DB test reproduction when a compatible container machine is available; no hosted DB changes.

### R5 — full-stack Playwright
- [ ] Add isolated E2E tests for six-stage creation, save/reopen/edit, two PNG exports, PT/EN, mobile, error/session and account isolation using **disposable local accounts only**.
- [ ] Preserve Turnstile, real-user accounts and production protections.

### R6 — optional operational maturity
- [ ] Evaluate CSP Report-Only, selective rate limits and privacy-safe structured logs only with a justified risk/maintenance tradeoff.

### R7 — single portfolio update after RPG
- [ ] Once R1–R5 (and any approved R6) are verified, update the RPG card/details **once** and recheck PT/EN/stack-chart provenance.
- [ ] Claim Docker, Playwright, OpenAPI, etc., **only after implemented in the RPG**; rerun portfolio lint, Vitest, build, browser checks and Preview review.

**RPG exclusions:** no multiplayer, combat, multiple characters, redesign, rule changes, PDF export, OAuth expansion, NestJS rewrite, AWS or paid infrastructure in this cycle.

## Stage 3 — first external open-source contribution (after R7)

### O1 — select a suitable project and issue
- [ ] Choose an **external**, publicly licensed project; read README/LICENSE/CONTRIBUTING, check an available good-first-issue, owners/comments/linked PRs, and confirm scope if ambiguous.

### O2 — contribute a focused fix
- [ ] Fork, branch, reproduce, change, test, document, and submit a PR that references the upstream issue.

### O3 — review and record real result
- [ ] Respond to maintainer feedback, document PR state, and call a contribution **merged** only after upstream accepts it.

## After the sequence

- [ ] Reevaluate any new project against real remaining job-market stack gaps; **do not start one now**.
- [ ] Refresh Portuguese/English résumé and LinkedIn using only demonstrable results.

**Next active step:** after owner-approved merge of the documentation/evidence follow-up, start **Adventure Files R1**, with a read-only baseline review before any implementation.
