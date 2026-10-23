# Developer Portfolio

A bilingual, responsive developer portfolio built with **React, TypeScript, Vite, and Tailwind CSS**. It presents selected projects, professional experience, technical skills, academic education, certifications, and direct contact channels.

The repository also documents the engineering practices behind the portfolio: an issue-driven workflow, reusable components, typed data, automated testing, continuous integration, code review, and preview/production deployments.

## Project Status

**Core portfolio sections are implemented and deployed to Vercel Production.** The project is undergoing documentation, SEO, accessibility, performance, and release-readiness refinements. A custom domain and the first tagged stable release (`v1.0.0`) are not yet configured or published.

- Default language: Portuguese, with an English option.
- Appearance: light and dark themes.
- Current automated test suite: **33 tests across 6 test files**.
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

Accessibility and performance improvements remain part of the release-readiness audit; the features above are not a claim of a completed WCAG or Lighthouse certification.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Application | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS v4, CSS custom properties |
| Icons and typography | Lucide React, Devicon assets, Google Fonts |
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
  favicon.svg            Current favicon (branding update planned)
src/
  components/            Reusable UI components and component tests
  data/                  Typed content for projects, experience, certifications, and contact
  test/                  Shared test setup
  App.tsx                Main page, sections, and language integration
  App.test.tsx           Main application tests
  index.css              Global styles and theme tokens
index.html               HTML entry point (SEO updates planned)
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

The current suite includes **33 automated tests in 6 test files**, covering the main application and interactive cards/components for projects, experience, certifications, the contact modal, and the footer.

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

A custom domain has not yet been selected or configured. Hosting options and DNS configuration will be reviewed separately, without changing the working production deployment prematurely.

The current application is a static frontend built with Vite; it does not require a dedicated application server or database to serve the portfolio.

## Privacy and External Links

- Original academic diploma and certificate PDFs are intentionally excluded from public site assets.
- Certification verification uses official links or supported institution-issued codes where appropriate.
- External profiles and contact channels open their corresponding services directly. The WhatsApp URL does not include a predefined message.
- Credential verification destinations and personal-information exposure are subject to review during ongoing maintenance.

## Roadmap

### Completed

- [x] Set up React, TypeScript, Vite, Tailwind CSS, and ESLint.
- [x] Configure GitHub Actions lint, test, and build checks.
- [x] Establish Issue-driven development and Pull Request reviews.
- [x] Implement Hero, Header, About Me, and Technologies.
- [x] Implement Projects and Experience.
- [x] Implement academic Education and Certifications.
- [x] Implement Contact modal, contact section, and Footer.
- [x] Add Portuguese/English and light/dark theme support.
- [x] Add 33 automated tests across 6 test files.
- [x] Set up Vercel Preview and Production deployments.

### In Progress

- [ ] Update documentation and review unused starter files.
- [ ] Audit accessibility, performance, content, and release readiness.

### Planned

- [ ] Improve metadata, Open Graph sharing, and SEO.
- [ ] Replace the default favicon with portfolio branding.
- [ ] Review image formats, loading behavior, and page performance.
- [ ] Improve accessibility based on measured findings.
- [ ] Add a portfolio case study to the Projects section.
- [ ] Evaluate hosting terms, register a custom domain, and configure DNS.
- [ ] Publish reviewed Portuguese and English résumé versions.
- [ ] Review repository security, links, and final documentation.
- [ ] Evaluate end-to-end testing and additional CI checks if justified.
- [ ] Publish the first stable release (`v1.0.0`) after final verification.

**Separate future exploration:** Docker and AWS experiments for infrastructure learning; these are not current production dependencies.

## Project Management

Work is tracked in [GitHub Issues](https://github.com/AlexandroLeao/developer-portfolio/issues). Pull Requests document changes, verification results, and related issues.

For further process details, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Author

**Alexandro Milhomes Leão**

- [GitHub](https://github.com/AlexandroLeao)
- [LinkedIn](https://www.linkedin.com/in/alexandroleao/)

## License

No license has been selected for this repository. Do not assume that its source code or assets are available for reuse under an open-source license.
