# Developer Portfolio

A bilingual, responsive developer portfolio built with **React, TypeScript, Vite, and Tailwind CSS**. It presents projects, professional experience, technical skills, education, certifications, and contact channels. The application is a **static, client-side single-page application**; it has no dedicated backend or application database.

**Live site:** [alexandroleao.com.br](https://alexandroleao.com.br/)  
**Stable release:** [v1.0.0](https://github.com/AlexandroLeao/developer-portfolio/releases/tag/v1.0.0)  
**Documentation:** [Documentation index](docs/README.md)

## Features

- Portuguese and English interface content, with language-specific PDF résumés.
- Light and dark themes, responsive navigation, and keyboard-accessible interactions.
- Project cards with source/demo links, technical details, and illustrative stack charts.
- Technology catalog with evidence labels distinguishing implementation, completed study, ongoing study, and plans.
- Professional experience timeline, education, curated certifications, and the full qualification catalog.
- Contact dialog and direct links to professional channels.
- Optimized local images, fonts, and icons; reduced-motion-aware animations.

The technology catalog is a **record of project experience and learning**, not a claim that every listed technology was used professionally or deployed in production. Project charts represent **manually maintained associations between technologies and selected source files**, not measured language percentages. The evidence and limitations are documented in [Performance and Quality](docs/performance-and-quality.md).

## Technology Stack

| Concern | Technology |
| --- | --- |
| UI | React 19, TypeScript |
| Build tooling | Vite 8, Node.js 24, npm |
| Styling | Tailwind CSS v4, CSS custom properties |
| Assets | Responsive WebP images, self-hosted fonts, Lucide and local/inline icons |
| Unit and component testing | Vitest, React Testing Library, jsdom |
| Browser and accessibility testing | Playwright (Chromium), axe-core |
| Code quality | ESLint, TypeScript compiler |
| CI | GitHub Actions |
| Production hosting | Vercel |
| Optional container | Multi-stage Docker build with non-root Nginx |

Technology versions are sourced from [package.json](package.json) and the repository configuration. The optional Docker setup does not replace Vercel hosting.

## Getting Started

### Prerequisites

- Node.js **24** (the version used by the GitHub Actions workflows)
- npm and Git

### Install and run

```bash
git clone https://github.com/AlexandroLeao/developer-portfolio.git
cd developer-portfolio
npm ci
npm run dev
```

Vite prints the local development URL in the terminal.

### Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:e2e` | Run Chromium Playwright and axe-core checks; local browser installation required |
| `npm run build` | Type-check and build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npx playwright test --list` | Discover browser tests without launching Chromium |

For local browser tests, first run `npx playwright install chromium` if Chromium is not installed. A documentation-only change does **not** require a full application test suite; see [Contributing](CONTRIBUTING.md).

### Optional local Docker deployment

From the repository root, with Docker running:

```bash
docker build -t developer-portfolio:local .
docker run --rm --name developer-portfolio-local \
  -p 127.0.0.1:8080:8080 developer-portfolio:local
```

Open `http://127.0.0.1:8080/`. Stop the container with `docker stop developer-portfolio-local`. The image serves the compiled static site using non-root Nginx on port 8080. The optional `bash docker/smoke.sh` check builds and verifies the local container; it is not needed for documentation edits. See the [architecture guide](docs/architecture.md) for deployment boundaries.

## Repository Layout

```text
.github/
  ISSUE_TEMPLATE/          Issue templates
  workflows/              CI, Playwright, Lighthouse and Docker checks
docker/                   Nginx configuration and container smoke script
docs/
  README.md               Documentation map and maintenance rules
  architecture.md         Architecture and deployment
  use-cases.md            Visitor-facing use cases
  performance-and-quality.md  Quality policy and dated evidence references
  engineering-roadmap.md  Portfolio-only engineering roadmap
  decisions/              Architecture decision records (ADRs)
  diagrams/               PlantUML sources and rendered SVGs
  evidence/               Historical audit evidence
e2e/                      Browser and automated accessibility tests
public/                   Static images, fonts, icons and résumé PDFs
src/
  components/             UI components and tests
  data/                   Typed portfolio content and tests
  styles/                 Local fonts and icon styles
  test/                   Shared test setup
  utils/                  Interaction helpers and tests
  App.tsx                 Page composition and interface state
CHANGELOG.md              Dated application and documentation changes
CONTRIBUTING.md           Contribution and validation conventions
Dockerfile                Optional static-site image
package.json              Dependencies and development commands
```

## Quality and Delivery

Pull Requests targeting `main` are checked by four independent GitHub Actions workflows:

| Workflow | Scope |
| --- | --- |
| [CI](.github/workflows/ci.yml) | ESLint, Vitest and production build |
| [Playwright](.github/workflows/playwright.yml) | Chromium functional and axe-core checks |
| [Lighthouse](.github/workflows/lighthouse.yml) | Mobile/desktop audits of a local production build |
| [Docker](.github/workflows/docker.yml) | Static-image build and HTTP smoke tests |

The Docker workflow also runs on relevant pushes to `main`. Vercel Preview/Production checks are separate from these workflows. **Lighthouse results are laboratory snapshots, and automated accessibility checks do not certify WCAG conformance.** Historical test counts and audit results belong in the [quality guide](docs/performance-and-quality.md) and its [dated evidence](docs/evidence/lighthouse-ci-2026-11-11.md), rather than being treated as continuously current README metrics.

## Architecture and Documentation

The portfolio bundles typed content from `src/data/`, presents it through React components, and stores language/theme preferences in browser storage. External links open services such as GitHub and LinkedIn; the site does not authenticate visitors or process contact messages on a backend.

For the full documentation set, see the [documentation index](docs/README.md), including:

- [Architecture](docs/architecture.md) and [visitor use cases](docs/use-cases.md)
- [Architecture decisions](docs/decisions/0001-client-side-architecture.md)
- [Performance and quality](docs/performance-and-quality.md)
- [Portfolio engineering roadmap](docs/engineering-roadmap.md)
- [Changelog](CHANGELOG.md) and [contributing guidelines](CONTRIBUTING.md)

## Release and Scope

The initial stable release `v1.0.0` was published; subsequent improvements are recorded in the [changelog](CHANGELOG.md) and do **not** imply additional release tags. The `main` branch is the production integration branch. New work follows a feature/documentation branch and Pull Request review process; see [Contributing](CONTRIBUTING.md).

Other applications may appear **as showcased portfolio projects**. Their engineering roadmaps, verification results and deployment policies are maintained in their own repositories, not in this portfolio's project documentation.

## Author and License

**Alexandro Milhomes Leão** — [GitHub](https://github.com/AlexandroLeao) · [LinkedIn](https://www.linkedin.com/in/alexandroleao/)

**License:** No open-source license has been selected. Do not assume permission to reuse the source code or assets.
