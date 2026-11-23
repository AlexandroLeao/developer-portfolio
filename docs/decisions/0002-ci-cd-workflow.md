# ADR 0002 — Issue-Driven Development and CI/CD

**Status:** Accepted (retrospectively documented)  
**Scope:** Developer Portfolio repository  
**Decision owner:** Project maintainer

## Context

The portfolio is a static frontend deployed through Vercel. Its changes need reviewable scope, reliable checks and a distinction between Vercel Preview, production deployment and GitHub Actions validation. Direct feature commits to the production branch increase the risk of unreviewed changes.

The initial workflow was established before browser E2E, accessibility audits, Lighthouse CI and the optional Docker smoke path were introduced. Those later additions remain independent quality checks rather than architectural backend changes.

## Decision

Adopt an Issue-driven, Pull Request-based workflow:

1. Define the approved scope and acceptance criteria in a portfolio Issue or PR.
2. Branch from an updated, clean `main`.
3. Implement focused changes and update affected documentation.
4. Run relevant local checks; record anything not executed.
5. Commit with Conventional Commits and push the branch.
6. Review Vercel Preview for affected UI/deployment behavior.
7. Open a PR referencing the Issue and review the GitHub Actions results.
8. Merge only after review and required checks; prefer squash merging.
9. Verify the integrated deployment and update the Issue/changelog.

Use **Node.js 24** for the CI baseline. Deploy the compiled client-side application through Vercel; maintain the Docker/Nginx path only as an **optional local/CI verification target**.

## Current Automation

| Workflow | Trigger | Checks |
| --- | --- | --- |
| [`ci.yml`](../../.github/workflows/ci.yml) | PR to `main` | `npm ci`, lint, Vitest, build |
| [`playwright.yml`](../../.github/workflows/playwright.yml) | PR to `main` | Chromium functional E2E and axe-core accessibility checks |
| [`lighthouse.yml`](../../.github/workflows/lighthouse.yml) | PR to `main` | Built-site mobile/desktop audits; advisory category medians and enforced metadata checks |
| [`docker.yml`](../../.github/workflows/docker.yml) | PR to `main`; selected pushes to `main` | Optional static Nginx container build and smoke tests |

Vercel Preview/Production checks are **separate** from GitHub Actions. Lighthouse runs against a local compiled site, not a production-origin URL. None of these checks establishes complete WCAG conformance or replaces manual review.

The quality workflows were added incrementally: Playwright in [PR #100](https://github.com/AlexandroLeao/developer-portfolio/pull/100), extended E2E in [PR #106](https://github.com/AlexandroLeao/developer-portfolio/pull/106), axe-core in [PR #108](https://github.com/AlexandroLeao/developer-portfolio/pull/108), Lighthouse in [PR #110](https://github.com/AlexandroLeao/developer-portfolio/pull/110), and Docker smoke in [PR #116](https://github.com/AlexandroLeao/developer-portfolio/pull/116). The dated test-count baseline and source runs are maintained in [Performance and Quality](../performance-and-quality.md).

## Alternatives Considered

- **Direct commits and manual deployment:** fewer steps, but weaker review, traceability and risk control.
- **One combined CI workflow:** simpler trigger model, but less separation of failure domains and resource requirements.
- **A custom container/cloud deployment pipeline:** unnecessary for the existing static Vercel site.

## Consequences

### Benefits

- Reviewable, attributable changes and predictable branch ownership.
- Independent build, browser, accessibility, Lighthouse and container results.
- Clear distinction between local validation, CI results and deployed-site verification.
- No application backend, paid Lighthouse server or additional hosting requirement.

### Costs and Limitations

- PR validation uses runner resources; the four workflows must not be triggered casually for prose-only edits.
- A `[skip ci]` commit can prevent GitHub Actions execution on supported events but may leave **required checks pending** and block merging on a protected branch. It is not a bypass of branch policy.
- Automated quality gates do not replace human review, assistive-technology checks or production observation.
- Test counts and CI scores are historical unless sourced to a specific inspected run.

## Maintainer workflow note — 2026-11-23

This ADR preserves the historical Issue-driven, PR-based decision. The maintainer updated the active `Protect main branch` ruleset on 2026-11-23: deletion protection, required linear history and force-push blocking remain active; mandatory PRs and status checks were disabled. Documentation-only updates may be committed directly to `main` without an Issue or PR after reviewing links, scope and technical accuracy. This **repository-wide** relaxation does not replace independent tests and reviews for application changes.

A branch-only commit is not a production update. Earlier, a PR with `[skip ci]` left the mandatory check pending, as occurred with [PR #123](https://github.com/AlexandroLeao/developer-portfolio/pull/123), which was closed without merging. That restriction was subsequently revised by the repository owner. See [Contributing](../../CONTRIBUTING.md) for current operating instructions. This dated note updates the workflow guidance without rewriting the historical rationale of the ADR.

## Supporting Evidence

- [Contributing guide](../../CONTRIBUTING.md)
- [Current workflow definitions](../../.github/workflows/)
- [Architecture](../architecture.md)
- [Dated Lighthouse evidence](../evidence/lighthouse-ci-2026-11-11.md)

This ADR governs **Developer Portfolio only**. The operations and release process of showcased projects are out of scope.
