# Contributing to Developer Portfolio

These conventions apply to **`AlexandroLeao/developer-portfolio` only**. They support focused review, truthful validation records and predictable deployment. Technical decisions live in [ADRs](docs/README.md#architecture-decisions), and implementation details in the [architecture guide](docs/architecture.md).

## Scope and Principles

- Define the problem and acceptance criteria before implementation.
- Restrict each change to the approved portfolio scope; changes to showcased applications belong in their own repositories.
- Preserve existing behavior, bilingual content, accessibility and visual identity unless the change explicitly requires otherwise.
- Use clear commits, reviewable Pull Requests and reproducible validation evidence.
- Never state that an audit, test or production verification passed unless it was actually performed.
- Avoid new paid services, credentials, infrastructure or dependency changes without explicit approval.

## Issues and Branches

Use a GitHub Issue for substantive changes, including objective, context, acceptance criteria, dependencies and affected documentation. Small documentation corrections can reference the related issue or explain why no issue is needed.

The `main` branch is the integrated production branch. Do **not** implement new work directly on `main`. From a clean working tree:

```bash
git status
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c docs/short-description
```

Recommended branch prefixes: `feat/`, `fix/`, `docs/`, `test/`, `refactor/`, `chore/` and `ci/`. Include the relevant Issue number when useful, for example `docs/issue-123-readme-review`.

## Commits and Pull Requests

Use short, descriptive [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) subjects such as:

```text
feat: improve project details
fix: constrain mobile navigation
test: cover contact dialog
docs: align architecture and README
ci: clarify quality check
```

For each Pull Request:

1. Explain the problem, scope and changes.
2. Link the relevant portfolio Issue; use `Closes #123` only when its acceptance criteria are fully met.
3. Record the **exact validation performed**, including commands/results, manual checks and anything not run.
4. Add screenshots for visual changes when useful.
5. Review Vercel Preview and GitHub Actions results when applicable and available.
6. Request review; merge only after approval and any required branch checks. Prefer squash merge when appropriate.
7. Verify the production deployment after a code-changing merge and update the relevant Issue/changelog.

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

## CI Resource Awareness for Documentation Edits

The repository has **four independent GitHub Actions workflows** triggered by Pull Requests targeting `main`: [CI](.github/workflows/ci.yml), [Playwright](.github/workflows/playwright.yml), [Lighthouse](.github/workflows/lighthouse.yml) and [Docker](.github/workflows/docker.yml). A docs-only Pull Request can therefore consume CI resources even when no application code changed.

For a strictly documentation-only change:

- Check local Markdown links, paths, headings and consistency first. Do not run lint, E2E, Lighthouse or Docker solely to reformat prose.
- Do **not** change workflow trigger rules as an unrelated workaround.
- Where explicitly agreed with the maintainer, a commit message containing `[skip ci]` can suppress GitHub Actions runs initiated by `push`/`pull_request` events. **Required status checks may then remain pending**, so the protected branch may not be mergeable until the normal required checks run or the maintainer resolves the policy.
- Record the skip and its reason in the Pull Request; never mark tests as passed when they were skipped.
- Do not rerun or merge automatically just to close a documentation change.

This guidance is for resource-conscious review, **not** an exception to required branch protection.

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
- If modifying a PlantUML diagram source, regenerate its SVG in the same PR.

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
- [ ] Review and any required GitHub branch checks are satisfied.
- [ ] The change is merged by an authorized maintainer, and the Issue updated or closed.
- [ ] Deployment is checked for a code-changing production release.

## Releases

The first stable release [`v1.0.0`](https://github.com/AlexandroLeao/developer-portfolio/releases/tag/v1.0.0) is already published. Future releases require an approved scope, relevant automated/manual verification, production confirmation and a versioned release record. A merged post-release PR does **not** itself create a new tag.

Historical score snapshots and their limitations are tracked in [Performance and Quality](docs/performance-and-quality.md), not treated as permanent release promises.
