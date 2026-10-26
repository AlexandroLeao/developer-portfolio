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

The current test suite contains 34 automated tests
across 6 test files.

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
- The project does not currently include end-to-end
  browser automation.

## Evidence

- .github/workflows/ci.yml
- CONTRIBUTING.md
- src/App.test.tsx
- src/components/*.test.tsx
- GitHub Issues and Pull Request history
