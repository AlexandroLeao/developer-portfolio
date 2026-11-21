# Developer Portfolio — Documentation

This index is the entry point for the **engineering documentation of this repository only**: `AlexandroLeao/developer-portfolio`.

The root [README](../README.md) introduces the product and local setup. The documents below describe the implementation, engineering decisions, quality methods, and historical evidence. Links to other software projects are **portfolio content references**; they do not expand the scope of this documentation set.

## Documentation Map

| Document | Purpose | Source of truth |
| --- | --- | --- |
| [Root README](../README.md) | Product overview, stack, installation and entry points | Current source/configuration |
| [Architecture](architecture.md) | Component boundaries, state, data flow, delivery architecture | `src/`, `package.json`, workflows |
| [Visitor use cases](use-cases.md) | Supported visitor interactions and constraints | App/components and browser tests |
| [Performance and quality](performance-and-quality.md) | Test strategy, audit interpretation, dated baseline links | Test code, CI configuration, archived reports |
| [Engineering roadmap](engineering-roadmap.md) | Completed and candidate **portfolio-only** work | Portfolio Issues and merged PRs |
| [Architecture decisions](decisions/0001-client-side-architecture.md) | Decision rationale, constraints and consequences | Current code and historical decision context |
| [Changelog](../CHANGELOG.md) | Dated changes to Developer Portfolio | Releases and portfolio PRs |
| [Contributing](../CONTRIBUTING.md) | Branching, PR review and validation expectations | Project workflow and tooling |
| [Lighthouse CI evidence — 2026-11-11](evidence/lighthouse-ci-2026-11-11.md) | Immutable historical summary with source and measurement boundaries | Inspected historical CI reports |

## Architecture Decisions

- [ADR 0001 — Client-side React architecture](decisions/0001-client-side-architecture.md)
- [ADR 0002 — Issue-driven workflow and CI/CD](decisions/0002-ci-cd-workflow.md)
- [ADR 0003 — Local fonts and optimized assets](decisions/0003-local-assets-performance.md)
- [ADR 0004 — Accessible motion and mobile navigation](decisions/0004-accessible-motion-mobile-navigation.md)

## Diagrams

- [Component diagram (SVG)](diagrams/components.svg) · [PlantUML source](diagrams/components.puml)
- [Use-case diagram (SVG)](diagrams/use-cases.svg) · [PlantUML source](diagrams/use-cases.puml)

The diagrams show **selected core relationships**; the component table and use-case catalog provide greater detail. When changing a PlantUML model, regenerate and review the matching SVG in the **same change**.

## Documentation Conventions

1. **Scope:** state facts about Developer Portfolio. A showcased project may be named to explain the portfolio UI, but its own roadmap, test totals, operations, and milestones belong in its separate repository.
2. **Accuracy:** verify commands, runtime requirements, dependencies, workflows, and file paths against the code before editing documentation.
3. **Evidence:** date numerical claims and identify the environment, source report, and limitations. Do not present older test counts or Lighthouse results as current measurements.
4. **Information architecture:** the root README stays concise; put setup and contribution rules in the contributing guide, design decisions in ADRs, audit methodology in the quality guide, and dated raw-report provenance in `evidence/`.
5. **Formatting:** use descriptive Markdown headings, clear tables, fenced code with language tags, relative links for internal files, and consistent terminology. Preserve historical ADR/evidence records rather than silently changing the past.
6. **Review:** documentation-only changes require link/path checks and technical review. Record any skipped application tests accurately; do not claim tests were executed.

## Maintenance Checklist

- Does the change describe **this** repository and the correct implementation state?
- Do all referenced local paths and relative Markdown links resolve?
- Are observed results distinguished from plans, historical observations and unverified claims?
- Are the README, index, architecture, roadmap and changelog consistent without unnecessary duplication?
- If a diagram source changed, was its rendered artifact updated?
- Were code, workflow and deployment changes excluded from a documentation-only scope?

See [Contributing](../CONTRIBUTING.md) for the Pull Request and validation process.
