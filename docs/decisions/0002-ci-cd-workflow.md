# ADR 0002: Issue-Driven Development and CI/CD

## Status

Accepted — documented retrospectively.

## Context

The portfolio was developed incrementally through multiple
features, refinements, and accessibility improvements.

Changes needed to remain traceable, testable, and reviewable
without directly modifying the production branch.

## Decision

Adopt an Issue-driven development workflow:

1. Define scope and acceptance criteria in GitHub Issues.
2. Create a dedicated branch from an updated main branch.
3. Implement focused changes.
4. Run local validation.
5. Create commits using Conventional Commits.
6. Push the branch and review the Vercel Preview deployment.
7. Open a Pull Request referencing the Issue.
8. Run GitHub Actions continuous integration.
9. Review checks and merge approved work into main.
10. Verify the production deployment.

Use squash merging for the established project workflow.

## Continuous Integration

GitHub Actions runs for Pull Requests targeting main.

The workflow uses Node.js 24 and executes:

- npm ci
- npm run lint
- npm run test
- npm run build

The automated suite grows with the project; its current test count
must be obtained by running `npm run test`. The documented
2026-11-09 baseline is 71 passing tests across 14 test files.

## Continuous Deployment

Vercel provides Preview deployments for feature branches
and Production deployments for the main branch.

Deployment checks complement the GitHub Actions workflow.

The application is validated after deployment using
manual reviews and relevant Lighthouse audits.

## Rationale

This process makes changes traceable and encourages early
detection of code quality, testing, and build problems.

Separating Preview and Production reduces the risk of
publishing unreviewed changes.

## Alternatives and Scope

Direct commits to main or exclusively manual deployment
would provide less structured review and traceability.

The project does not use Kubernetes, Terraform, or a
custom container deployment pipeline.

A formal Scrum process or an active GitHub Projects
Kanban board is not required by this workflow.

## Consequences

### Benefits

- Traceable changes linked to Issues and Pull Requests.
- Repeatable automated checks.
- Isolated Preview environments.
- Clear integration and release history.

### Trade-offs

- More process steps than directly editing production.
- Automated checks do not replace manual verification.
- When this ADR was originally adopted, browser end-to-end automation was deferred. Its later introduction is recorded in the addendum below.

## Evidence

- .github/workflows/ci.yml
- CONTRIBUTING.md
- src/App.test.tsx
- src/components/*.test.tsx
- GitHub Issues and Pull Request history

## Addendum — 2026-11-11: Playwright browser E2E

Issue #99 and PR #100 extend the established review workflow with a **separate** `.github/workflows/playwright.yml` job. The original `ci.yml` lint/Vitest/build checks remain intact. The new job installs headless Chromium on GitHub-hosted Ubuntu and runs five Playwright E2E scenarios from `e2e/portfolio.e2e.ts`, covering language and theme switching, project details, resume downloads, and mobile navigation.

This addition improves browser-level regression coverage without changing the client-side architecture, introducing a backend, or replacing manual accessibility reviews. Evidence: the [Playwright workflow](../../.github/workflows/playwright.yml), [E2E test file](../../e2e/portfolio.e2e.ts), and [Issue #99](https://github.com/AlexandroLeao/developer-portfolio/issues/99).

## Addendum — 2026-11-11: P2–P4 browser, accessibility, and Lighthouse gates

The original five Playwright tests above are a **dated implementation baseline**, not the current total. [PR #106](https://github.com/AlexandroLeao/developer-portfolio/pull/106) extended Chromium functional E2E coverage to **10** scenarios. [PR #108](https://github.com/AlexandroLeao/developer-portfolio/pull/108) added **11** development-only axe-core accessibility audits, giving **21 Playwright scenarios** in the same independent PR workflow, while retaining the 72-test Vitest suite.

[PR #110](https://github.com/AlexandroLeao/developer-portfolio/pull/110) added a **third, independent Lighthouse CI workflow** that audits a compiled local production build on mobile and desktop, three samples each, retaining HTML/JSON artifacts for seven days. The final PR #110 CI, Playwright and both Lighthouse jobs passed before the owner's merge. Median Lighthouse category thresholds are advisory; metadata checks are enforced. No hosted Lighthouse service, paid infrastructure, app backend, or production secrets were introduced.

These additions preserve the Issue → branch → tests → PR → owner-review/merge process. Axe and Lighthouse automation do **not** certify WCAG conformance or replace real-device and production checks. Refer to [Performance and Quality](../performance-and-quality.md) for the evidence, limitations, and reproducible commands.

## Addendum — 2026-11-12: P6 Docker and R7 final quality baseline

A fourth independent workflow, [Portfolio Docker Checks](../../.github/workflows/docker.yml), builds and smoke-tests the static Nginx container on pull requests and relevant main pushes. It is a local/CI verification path, not a change to Vercel hosting or a registry/deployment pipeline. [PR #118](https://github.com/AlexandroLeao/developer-portfolio/pull/118) merged as `b3d3f90` (November 12, 2026). Corrected head `beaae21` passed [CI](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952577) (**74 Vitest tests / 14 files**, lint/build), [Playwright](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952037) (**21/21**: 10 functional and 11 axe-core, 31.1s), [Lighthouse](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952404) (both profiles, three samples each, configured assertions) and [Docker](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43242952375). [Post-merge Docker](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43243406342) passed: Nginx 1.30.6, UID 101, 27,523,076-byte image, static assets and both PDFs HTTP 200, missing paths 404. Vercel reported success. The 74 Vitest count supersedes the earlier 71/72-test snapshots; the 21 browser checks remain unchanged. No complete WCAG conformance, new production measurement or authenticated RPG container integration is claimed. See the [quality guide](../performance-and-quality.md).
