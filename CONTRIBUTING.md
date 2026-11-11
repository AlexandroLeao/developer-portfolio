# Contributing Guide

This document defines the development practices used in the Developer Portfolio project.

The goal is to maintain a consistent, traceable, and quality-focused software engineering workflow.

## 1. Development Principles

- Plan before implementing.
- Use GitHub Issues to track work.
- Keep changes focused and understandable.
- Preserve approved functionality unless a change is required.
- Write clear commit messages.
- Validate changes before delivery.
- Review Pull Requests before merging.
- Document important technical decisions.
- Never claim that a test or verification passed unless it was executed.

## 2. Project Management

The project uses an Issue-driven workflow inspired by Kanban.

### Proposed Kanban Columns

| Column | Meaning |
| --- | --- |
| Backlog | Ideas and tasks not yet prioritized |
| To Do | Planned and ready for development |
| In Progress | Currently being implemented |
| In Review | Awaiting review, CI validation, or merge |
| Done | Completed and accepted work |

These columns describe the intended workflow. A GitHub Projects board will be configured separately if needed.

### GitHub Issues

Each development task should have an Issue containing:

- Objective
- Description or context
- Tasks
- Acceptance criteria
- Relevant dependencies or notes

Use separate Issues for work that can be independently planned, implemented, and validated.

## 3. Branching Strategy

The `main` branch represents the integrated project state.

Do not implement new features directly on `main`.

Before creating a branch:

```bash
git status
git fetch origin
git switch main
git pull --ff-only origin main
```

Only proceed if there are no unexpected local changes.

### Branch Naming

Use lowercase, hyphen-separated names.

Recommended prefixes:

- `feat/` — New functionality
- `fix/` — Bug fixes
- `docs/` — Documentation
- `test/` — Tests
- `refactor/` — Code restructuring
- `chore/` — Maintenance
- `ci/` — Continuous Integration

Examples:

```text
feat/issue-10-projects-section
fix/issue-11-mobile-navigation
docs/issue-9-development-workflow
test/issue-12-header-tests
```

Prefer including the related Issue number.

## 4. Implementation Workflow

For each task:

1. Review the Issue and acceptance criteria.
2. Discuss the implementation approach.
3. Create a branch from the updated `main`.
4. Implement focused changes.
5. Review the affected code and user experience.
6. Run the applicable validation commands.
7. Create clear, incremental commits.
8. Push the branch to GitHub.
9. Open a Pull Request.
10. Review the changes and CI results.
11. Merge when ready.
12. Verify the Issue status and documentation.

Avoid unrelated changes in the same Pull Request.

## 5. Conventional Commits

Commit messages should follow this structure:

```text
type: short description
```

Examples:

```text
feat: add projects section
fix: correct mobile navigation behavior
docs: update development workflow
test: add header component tests
refactor: simplify theme handling
ci: add automated test job
chore: update dependencies
```

Use imperative, concise descriptions.

Commit after a coherent change has been implemented and appropriately checked.

## 6. Validation

### Current Commands

Install dependencies:

```bash
npm ci
```

Run static analysis:

```bash
npm run lint
```

Run automated tests once:

```bash
npm run test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

List the Playwright browser tests without installing browsers:

```bash
npx playwright test --list
```

To execute the Playwright tests locally, install Chromium once and run the suite:

```bash
npx playwright install chromium
npm run test:e2e
```

The GitHub Actions workflow installs headless Chromium automatically, so local browser installation is optional.

Run TypeScript compilation and production build:

```bash
npm run build
```

Check the Git working tree:

```bash
git status
```

### Manual Validation

When relevant, verify:

- Desktop layout
- Mobile layout
- Portuguese content
- English content
- Light theme
- Dark theme
- Navigation and interactive controls
- Keyboard interaction
- Responsive behavior
- Links and downloads

### Automated Tests

Vitest, React Testing Library, Testing Library jest-dom, and jsdom are implemented in the project.

The test suite covers the application and key components, including mobile-selection behavior, the Hero mascot, dialogs, and certification filtering. For historical context, the verified baseline on 2026-11-09 was 71 passing tests across 14 files. Run `npm run test` to see the current total; do not copy an old count into a new PR without running the suite.

The Vitest configuration uses the `vmThreads` pool to reduce repeated `jsdom` setup while retaining separate VM contexts for test files. Run the normal `npm run test` command; no extra CLI flag is required. The pool can have cross-realm and memory-retention trade-offs, so preserve isolation and confirm repeated runs in CI before accepting further test-runner changes. See [Performance and Quality](docs/performance-and-quality.md) for the dated Cloud Shell timings.

Three independent GitHub Actions workflows run on pull requests targeting `main`:

- [Continuous Integration](.github/workflows/ci.yml) executes `npm run lint`, `npm run test` (Vitest), and `npm run build`.
- [Lighthouse CI](.github/workflows/lighthouse.yml) runs repeated mobile and desktop audits of the production build and archives reports.
- [Playwright E2E Tests](.github/workflows/playwright.yml) installs headless Chromium and runs `npx playwright test`. A failing browser test fails its job.

The 10 Playwright scenarios across `e2e/portfolio.e2e.ts` and `e2e/accessibility-and-layout.e2e.ts` verify language switching, themes, project details, PT/EN résumé downloads, mobile navigation, keyboard-operated dialogs and focus restoration, contact/project link targets, reduced motion, and viewport overflow. The `.e2e.ts` extension keeps them separate from Vitest. A separate `e2e/axe-accessibility.e2e.ts` suite adds WCAG A/AA automated checks using `@axe-core/playwright` (see Issue #107). The same `npm run test:e2e` command runs functional and rule-based checks. Browser automation complements, rather than replaces, manual accessibility and device checks.

### Performance and Accessibility Audits

On Pull Requests to `main`, the independent [Lighthouse CI workflow](.github/workflows/lighthouse.yml) builds `dist/` and collects three mobile and three desktop measurements with `@lhci/cli@0.16.0`. Review the HTML/JSON artifacts (`lighthouse-mobile`, `lighthouse-desktop`; retained seven days) and distinguish advisory median category warnings from hard failures of collection or metadata checks. Local reproduction uses Node.js 24, Chrome, and `npm install --global @lhci/cli@0.16.0`, followed by `npm run build` and `LHCI_DEVICE=mobile lhci autorun` or `LHCI_DEVICE=desktop lhci autorun`. Reports are not uploaded to external Lighthouse hosting.

For changes that affect loading, layout, rendering, or animation:

1. Run the production build and inspect the relevant desktop and mobile views.
2. Run PageSpeed Insights or Lighthouse against the intended deployment URL.
3. Record the URL, audit date, device mode (mobile/desktop), four category scores, and a shareable report link or exported JSON when available.
4. Clearly label audit results reported by another person when the raw report has not been independently reviewed.
5. Check that animations respect `prefers-reduced-motion` and that horizontal selectors do not expand the page width.

Scores are point-in-time laboratory measurements. A perfect Accessibility score does not constitute WCAG certification. See [Performance and Quality](docs/performance-and-quality.md).

## 7. Pull Requests

Each Pull Request should include:

- A clear title
- Summary of changes
- Related Issue
- Testing performed
- Screenshots for visual changes, when useful
- Known limitations or follow-up work

Use `Closes #NUMBER` when the PR fully resolves the referenced Issue.

Do not use an automatic closing keyword if acceptance criteria remain incomplete.

### Before Merging

Confirm that:

- The implementation meets the agreed scope.
- The code has been reviewed.
- Relevant validation has passed.
- Required CI checks are successful.
- No unresolved merge conflicts remain.
- Documentation is updated when needed.

Prefer squash merging for feature branches when appropriate.

## 8. Definition of Done

A task is considered Done when:

- [ ] Its scope and acceptance criteria are understood.
- [ ] The implementation is complete.
- [ ] Relevant manual validation has been performed.
- [ ] Applicable lint, build, and automated tests pass.
- [ ] Accessibility and responsiveness have been considered where relevant.
- [ ] The changes are documented when necessary.
- [ ] The Pull Request references the related Issue.
- [ ] The Pull Request has been reviewed.
- [ ] Required CI checks pass.
- [ ] Changes are merged into `main`.
- [ ] The related Issue is closed or updated appropriately.

If an original requirement changes, document the approved scope adjustment.

## 9. Security and Dependencies

- Do not commit passwords, tokens, API keys, or other secrets.
- Keep sensitive values out of source control.
- Review dependency changes.
- Investigate reported vulnerabilities.
- Use minimal permissions in CI workflows.
- Track security improvements as separate Issues when appropriate.

## 10. Documentation

Update documentation when:

- Setup instructions change.
- Dependencies or tooling change.
- New functionality is delivered.
- The development workflow changes.
- Important architectural decisions are made.

Documentation should distinguish between implemented features and planned work.

## 11. Session Checklist

### Start of Session

- Check the active branch.
- Check `git status`.
- Review relevant Issues and Pull Requests.
- Confirm the task and acceptance criteria.

### During Development

- Implement focused changes.
- Validate affected behavior.
- Make clear commits.
- Track decisions and follow-up work.

### End of Session

- Run relevant checks.
- Confirm the Git status.
- Push committed work when appropriate.
- Update the related Issue or Pull Request.
- Record unfinished work.

## 12. Release Process

Before the first stable release:

- Complete the agreed portfolio scope.
- Run the full applicable test suite.
- Review accessibility, performance, and security.
- Verify production deployment.
- Review documentation and metadata.
- Confirm critical links and downloads.
- Close or appropriately defer outstanding Issues.
- Publish a versioned release.

The first stable release is planned as `v1.0.0`.
