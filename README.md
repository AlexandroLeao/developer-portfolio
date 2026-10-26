# Developer Portfolio

A bilingual, responsive developer portfolio built with **React, TypeScript, Vite, and Tailwind CSS**. It presents selected projects, professional experience, technical skills, academic education, certifications, and direct contact channels.

The repository also documents the engineering practices behind the portfolio: an issue-driven workflow, reusable components, typed data, automated testing, continuous integration, code review, and preview/production deployments.

## Project Status

**The portfolio is implemented and deployed to Vercel Production.** SEO, performance, accessibility, and visual identity improvements have been completed. The custom domain [alexandroleao.com.br](https://alexandroleao.com.br/) is connected to Vercel Production, with DNS configuration validated. Preparation for the first stable release (`v1.0.0`) are in progress.

- Default language: Portuguese, with an English option.
- Appearance: light and dark themes.
- Current automated test suite: **34 tests across 6 test files**.
- Development: GitHub Issues, feature branches, Pull Requests, GitHub Actions, and Vercel Preview.
- Deployment: the `main` branch is published to Vercel Production.

## Implemented Features

- **Hero and Header:** professional introduction, responsive navigation, theme/language controls, and scroll-aware behavior.
- **About Me:** professional background and approach to software development.
- **Technologies:** categorized skills with interactive details.
- **Projects:** project cards with technology tags, expandable technical descriptions, repository links, and live demos when available.
- **Experience:** professional timeline with expandable responsibilities, contributions, and relevant skills.
- **Education and Certifications:** academic background, 17 completed courses/certifications, detailed learning topics, supported official verification mechanisms, and Java training clearly marked as in progress.
- **Contact:** reusable, accessible dialog with Email, LinkedIn, GitHub, and WhatsApp links; a dedicated contact section and footer with direct links.
- **Internationalization:** Portuguese and English content throughout the interface.
- **Accessibility and responsiveness:** semantic elements, accessible labels and interactive states, keyboard interactions, reduced-motion considerations, and desktop/mobile layouts.
- **Navigation:** responsive menu, section anchors, and a back-to-top control.

Accessibility and performance improvements have been validated through automated tests, manual reviews, and Lighthouse audits. Recorded scores are individual measurements and do not constitute WCAG certification or guarantee future scores.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Application | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS v4, CSS custom properties |
| Icons and typography | Lucide React, local Devicon WOFF2 subset, self-hosted Inter and Outfit fonts |
| Unit/component testing | Vitest, React Testing Library, jest-dom, user-event, jsdom |
| Code quality | ESLint, TypeScript compiler |
| Source control | Git, GitHub, GitHub Codespaces |
| Continuous integration | GitHub Actions |
| Deployment | Vercel Preview and Production |

Docker and AWS are **not** required to build or host the current portfolio. They may be evaluated in separate learning or infrastructure experiments.

## Repository Structure

```text
.github/
  ISSUE_TEMPLATE/         Issue templates
  workflows/ci.yml       Pull Request CI
public/
  images/                Portfolio and project illustrations
  favicon.svg            Custom AL favicon
src/
  components/            Reusable UI components and component tests
  data/                  Typed content for projects, experience, certifications, and contact
  test/                  Shared test setup
  App.tsx                Main page, sections, and language integration
  App.test.tsx           Main application tests
  index.css              Global styles and theme tokens
index.html               HTML entry point and SEO metadata
docs/
  architecture.md         Architecture overview
  use-cases.md            Visitor use case catalog
  diagrams/               PlantUML diagrams
  decisions/              Architectural decision records
CONTRIBUTING.md          Development and review conventions
README.md                Project overview and setup
```

## Getting Started

### Requirements

- Node.js **24** (matches the GitHub Actions workflow)
- npm
- Git

### Installation

```bash
git clone https://github.com/AlexandroLeao/developer-portfolio.git
cd developer-portfolio
npm ci
```

### Development

```bash
npm run dev
```

Vite starts a local development server and prints its address in the terminal. Use the Vercel Preview deployments to review feature branches in this project's established workflow.

### Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the Vitest test suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run build` | Run TypeScript compilation and create the production build |
| `npm run preview` | Serve the production build locally for review |

## Testing and Quality

The current suite includes **34 automated tests in 6 test files**, covering the main application and interactive cards/components for projects, experience, certifications, the contact modal, and the footer.

```bash
npm run lint
npm run test
npm run build
```

The test suite exercises representative rendering, language/theme changes, expandable content, contact links, and modal/footer interactions. It does not replace browser-based accessibility or performance audits.

### Continuous Integration

GitHub Actions runs the [Continuous Integration workflow](.github/workflows/ci.yml) on Pull Requests targeting `main`. The job:

1. Checks out the repository.
2. Sets up Node.js 24 and npm caching.
3. Installs dependencies with `npm ci`.
4. Runs `npm run lint`.
5. Runs `npm run test`.
6. Runs `npm run build`.

A failed step fails the CI job. Vercel deployment checks are handled separately from this GitHub Actions workflow.

## Technical Documentation

The repository includes documentation of the implemented
software architecture, visitor use cases, engineering workflow,
and architectural decisions.

### Architecture and UML

- [Software Architecture](docs/architecture.md)
- [Visitor Use Cases](docs/use-cases.md)
- [UML Component Diagram — SVG](docs/diagrams/components.svg) ([PlantUML source](docs/diagrams/components.puml))
- [UML Use Case Diagram — SVG](docs/diagrams/use-cases.svg) ([PlantUML source](docs/diagrams/use-cases.puml))

The UML diagrams are maintained as PlantUML source files.
They can be rendered with a compatible PlantUML tool.

### Architectural Decision Records

- [ADR 0001 — Client-Side React Architecture](docs/decisions/0001-client-side-architecture.md)
- [ADR 0002 — Issue-Driven Development and CI/CD](docs/decisions/0002-ci-cd-workflow.md)
- [ADR 0003 — Local Fonts and Optimized Static Assets](docs/decisions/0003-local-assets-performance.md)

These records retrospectively document decisions reflected
in the implemented project. They do not imply that a formal
ADR process was used from the beginning.

For contribution conventions and validation requirements,
see [CONTRIBUTING.md](CONTRIBUTING.md).

## Development Workflow

Changes follow an Issue-driven process:

1. Define and approve the scope and acceptance criteria.
2. Create a GitHub Issue.
3. Create a dedicated branch from an updated, clean `main`.
4. Implement the change using typed data and reusable components where appropriate.
5. Run lint, tests, build, and relevant manual checks.
6. Commit using Conventional Commits and push the branch.
7. Review the Vercel Preview on desktop and mobile, including both languages and themes when affected.
8. Open a Pull Request referencing the Issue (for example, `Closes #23`).
9. Confirm required GitHub Actions and Vercel checks, then squash and merge.
10. Synchronize the local `main` and verify the Vercel Production deployment.

Do not commit directly to `main`. See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution conventions and the Definition of Done.

## Deployment

The portfolio is hosted on **Vercel**:

- **Preview:** deployments associated with feature branches and Pull Requests are used for design, interaction, and responsive reviews.
- **Production:** approved changes merged into `main` are deployed to the production environment and verified after merging.

The primary production domain is [alexandroleao.com.br](https://alexandroleao.com.br/). DNS configuration is validated, and `www.alexandroleao.com.br` redirects permanently to the apex domain using HTTP 308. The original Vercel deployment URL remains available.

The current application is a static frontend built with Vite; it does not require a dedicated application server or database to serve the portfolio.

## Privacy and External Links

- Original academic diploma and certificate PDFs are intentionally excluded from public site assets.
- Certification verification uses official links or supported institution-issued codes where appropriate.
- External profiles and contact channels open their corresponding services directly. The WhatsApp URL does not include a predefined message.
- Credential verification destinations and personal-information exposure are subject to review during ongoing maintenance.

## Roadmap

### Completed

- [x] Initialize the React, TypeScript, Vite, and Tailwind CSS project.
- [x] Configure ESLint and TypeScript validation.
- [x] Establish an Issue-driven development workflow.
- [x] Implement GitHub Actions continuous integration.
- [x] Add 34 automated tests across 6 test files.
- [x] Implement all core portfolio sections.
- [x] Support Portuguese and English languages.
- [x] Support light and dark themes.
- [x] Implement responsive navigation and interactive components.
- [x] Deploy Preview and Production environments on Vercel.
- [x] Implement SEO metadata and Open Graph sharing.
- [x] Create the custom AL favicon and social preview image.
- [x] Optimize project images using responsive WebP assets.
- [x] Self-host Inter, Outfit, and optimized Devicon fonts.
- [x] Improve the resume placeholder's accessibility.
- [x] Achieve 100/100 in all four Lighthouse categories in a production audit.
- [x] Purchase the custom domain alexandroleao.com.br.
- [x] Complete custom domain DNS configuration and verification.
- [x] Update and expand technical project documentation.
- [x] Document software architecture and UML diagrams.
- [x] Record significant architectural decisions using ADRs.

### In Progress

- [ ] Update canonical URLs and social metadata for the verified domain.

### Planned
- [ ] Perform a final production review of links, SEO, and accessibility.
- [ ] Create Portuguese and English resume PDFs.
- [ ] Enable language-specific resume downloads.
- [ ] Align LinkedIn with the completed portfolio and resume.
- [ ] Complete final release-readiness checks.
- [ ] Publish the first stable release (v1.0.0).

### Deferred / Future Improvements

- [ ] Reevaluate adding the Developer Portfolio to the Projects section.
- [ ] Consider end-to-end tests if future complexity justifies them.
- [ ] Explore Docker, AWS, and infrastructure automation separately.

The roadmap reflects completed and planned work. Lighthouse scores
represent individual audit results rather than a permanent guarantee
of performance or accessibility compliance.

## Project Management

Work is tracked in [GitHub Issues](https://github.com/AlexandroLeao/developer-portfolio/issues). Pull Requests document changes, verification results, and related issues.

For further process details, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Author

**Alexandro Milhomes Leão**

- [GitHub](https://github.com/AlexandroLeao)
- [LinkedIn](https://www.linkedin.com/in/alexandroleao/)

## License

No license has been selected for this repository. Do not assume that its source code or assets are available for reuse under an open-source license.
