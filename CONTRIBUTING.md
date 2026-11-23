# Contributing to Developer Portfolio

These conventions apply to **`AlexandroLeao/developer-portfolio` only**. They support focused review, truthful validation records and predictable deployment. Technical decisions live in [ADRs](docs/README.md#architecture-decisions), and implementation details in the [architecture guide](docs/architecture.md).

## Scope and Principles

- Define the problem and acceptance criteria before implementation.
- Restrict each change to the approved portfolio scope; changes to showcased applications belong in their own repositories.
- Preserve existing behavior, bilingual content, accessibility and visual identity unless the change explicitly requires otherwise.
- Use clear commits and reproducible review notes; a Pull Request is currently required to integrate changes into the protected `main`, not to prepare documentation on a branch.
- Never state that an audit, test or production verification passed unless it was actually performed.
- Avoid new paid services, credentials, infrastructure or dependency changes without explicit approval.

## Issues and Branches

Record the objective, affected files, acceptance criteria and validation evidence in a commit message or change note. GitHub Issues are **optional tracking**, not a prerequisite for documentation or other scoped work. Use an Issue when a task needs discussion, coordination or a separate backlog.

The `main` branch is the integrated production branch. As of 2026-11-23, the active `Protect main branch` ruleset requires a Pull Request with squash merge and the `Build, Lint and Test` status check. A documentation branch may be edited without a PR, but those commits are **not integrated or deployed** until an authorized integration path is completed. From a clean working tree:

```bash
git status
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c docs/short-description
```

Recommended branch prefixes: `feat/`, `fix/`, `docs/`, `test/`, `refactor/`, `chore/` and `ci/`. Include the relevant Issue number when useful, for example `docs/issue-123-readme-review`.

## Commits, Review and Integration

Use short, descriptive [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) subjects such as:

```text
feat: improve project details
fix: constrain mobile navigation
test: cover contact dialog
docs: align architecture and README
ci: clarify quality check
```

When opening a Pull Request for protected-branch integration:

1. Explain the problem, scope and changes.
2. Link a portfolio Issue only if one exists; use `Closes #123` only when its acceptance criteria are fully met.
3. Record the **exact validation performed**, including commands/results, manual checks and anything not run.
4. Add screenshots for visual changes when useful.
5. Review Vercel Preview and GitHub Actions results when applicable and available.
6. Request review; merge only after approval and any required branch checks. Prefer squash merge when appropriate.
7. Verify production after a code-changing merge; update the changelog and any related Issue **if one was created**.

Do not assume a successful Preview or Actions status proves a complete public-site audit.

## Validation Matrix

| Change type | Minimum review | Additional checks when affected |
| --- | --- | --- |
| Documentation only | Markdown structure, internal links, technical accuracy, repository scope and terminology | Review affected diagrams and evidence provenance |
| Content, data or components | `npm run lint`, `npm run test`, `npm run build` | Both languages/themes, relevant browser scenarios |
| Interaction, layout or accessibility | Applicable code checks above | `npm run test:e2e`, keyboard, mobile and reduced motion |
| Performance-affecting UI/assets | Applicable code checks above | Built-site Lighthouse reports and visual review |
| Docker/configuration | Relevant build/config checks | `bash docker/smoke.sh` when Docker is available |
| CI/workflow modifications | Syntax/event/permission review and relevant local checks | Actual workflow execution when authorized |

### Commands

```bash
npm ci
npm run lint
npm run test
npm run build
```

Additional commands:

- `npm run dev` — local Vite server.
- `npm run test:watch` — interactive Vitest.
- `npx playwright test --list` — enumerate tests without launching a browser.
- `npx playwright install chromium` — optional local browser installation.
- `npm run test:e2e` — Chromium functional and axe-core checks.
- `npm run preview` — inspect the built site.
- `bash docker/smoke.sh` — optional local container validation.

Node.js **24** is the CI baseline. The `vmThreads` Vitest pool is already configured; no additional test-runner flag is needed.

## Documentation-only Work Without Actions Runs

The repository currently defines four GitHub Actions workflows triggered by Pull Requests targeting `main`: [CI](.github/workflows/ci.yml), [Playwright](.github/workflows/playwright.yml), [Lighthouse](.github/workflows/lighthouse.yml) and [Docker](.github/workflows/docker.yml). Docker also runs on specified changes pushed to `main`. **Creating a PR is not an Actions execution; running jobs is what uses runner resources.** The standard `ubuntu-latest` runners are free for this public repository, although unnecessary execution still wastes resources.

To prepare a strictly documentation-only change without starting these workflows:

1. Work on a standalone `docs/` branch with **no open PR**, and do not push to `main`.
2. Confirm that only Markdown or documentation artifacts changed; do not edit application, dependencies, workflow or deployment settings as part of a docs-only correction.
3. Inspect relative links and paths, Markdown structure, technical claims against code/configuration, historical evidence, and the scope of other showcased projects.
4. Commit the reviewed documentation to the branch. Record tests as **not run** when they were not executed. A commit on this branch does not itself update production.
5. Distinguish **prepared on branch** from **integrated into `main`** in the changelog and any delivery summary.

### Publishing changes to the protected branch

The active `Protect main branch` ruleset requires a PR, a squash merge, and a passing `Build, Lint and Test` status. Consequently, branch-only documentation cannot be published to `main` without either satisfying that rule through the PR workflow or having the repository owner **explicitly revise the ruleset** before a direct integration. Do not disable the protections silently or force-push the branch.

**Do not add `[skip ci]` to a PR commit to avoid its required status check.** GitHub may keep that check pending indefinitely, preventing merge. A PR running only the required build check would require a separately reviewed workflow/ruleset design; path-filtering an entire required workflow is not a safe shortcut.

Vercel deployment checks are independent of GitHub Actions. Local Markdown review does not assert a successful application build, a live deployment, or a new Lighthouse result.

## Documentation Standards

Use the [documentation index](docs/README.md) as the map of authoritative content:

| Information | Canonical location |
| --- | --- |
| Product purpose and quick start | [README](README.md) |
| Implementation, boundaries and deployment | [Architecture](docs/architecture.md) |
| Visitor behavior | [Use cases](docs/use-cases.md) |
| Technical decisions and consequences | [ADRs](docs/README.md#architecture-decisions) |
| Audit configuration, dated baselines and limitations | [Performance and Quality](docs/performance-and-quality.md) |
| Historical raw-report provenance | [Evidence record](docs/evidence/lighthouse-ci-2026-11-11.md) |
| Portfolio-only completed/planned work | [Roadmap](docs/engineering-roadmap.md) |
| Dated changes | [Changelog](CHANGELOG.md) |

Rules:

- Verify all commands and file paths against the current tree.
- Prefer repository-relative links and language-tagged code fences.
- Separate **current implementation**, **dated historical evidence**, **owner-reported results** and **future proposals**.
- Do not copy another project's backlog, validation metrics or release history into this repository.
- Preserve ADR and historical evidence semantics; use a dated amendment rather than silently rewriting an earlier decision.
- If modifying a PlantUML diagram source, regenerate its SVG in the same change.

## Security and Privacy

- Do not commit credentials, private keys, tokens or personal documents not intended for publication.
- Keep original educational certificates and other sensitive materials outside public assets.
- Review third-party links, dependency changes and CI permission scopes.
- Do not attach private data or unrelated project artifacts to portfolio Issues/PRs.

## Definition of Done

A portfolio change is Done only when:

- [ ] Scope and acceptance criteria are met.
- [ ] Code/documentation changes are reviewed and confined to this repository.
- [ ] Applicable validation is completed **or explicitly recorded as not run**, with rationale.
- [ ] Affected links, translations, responsiveness and accessibility are reviewed as appropriate.
- [ ] Related documentation and the changelog are updated when necessary.
- [ ] If integrating into protected `main`, all required reviews and GitHub branch checks are satisfied.
- [ ] The delivery state is explicit: **prepared on a branch** or **integrated into `main`**. Update/close an Issue only if one was used.
- [ ] Deployment is checked for a code-changing production release.

## Releases

The first stable release [`v1.0.0`](https://github.com/AlexandroLeao/developer-portfolio/releases/tag/v1.0.0) is already published. Future releases require an approved scope, relevant automated/manual verification, production confirmation and a versioned release record. A merged post-release PR does **not** itself create a new tag.

Historical score snapshots and their limitations are tracked in [Performance and Quality](docs/performance-and-quality.md), not treated as permanent release promises.
