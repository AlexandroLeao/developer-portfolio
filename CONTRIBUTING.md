
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

Vitest, React Testing Library, and Playwright are planned.

Once introduced, applicable automated tests will become part of the validation process and CI workflow.

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
