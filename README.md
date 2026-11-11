# Developer Portfolio

A bilingual, responsive developer portfolio built with **React, TypeScript, Vite, and Tailwind CSS**. It presents selected projects, professional experience, technical skills, academic education, certifications, and direct contact channels.

The repository also documents the engineering practices behind the portfolio: an issue-driven workflow, reusable components, typed data, automated testing, continuous integration, code review, and preview/production deployments.

## Project Status

**The portfolio is implemented and deployed to Vercel Production.** The custom domain [alexandroleao.com.br](https://alexandroleao.com.br/) is connected to Vercel Production, with DNS configuration validated. The first stable release (`v1.0.0`) has been published; subsequent responsive, interaction, and visual refinements are tracked separately in the [changelog](CHANGELOG.md). See the [official GitHub Release](https://github.com/AlexandroLeao/developer-portfolio/releases/tag/v1.0.0).

- Default language: Portuguese, with an English option.
- Appearance: light and dark themes.
- Automated tests as of 2026-11-11: **72 passing tests across 14 test files** (up from the 71-test baseline on 2026-11-09). Run `npm run test` for the current count.
- Development: GitHub Issues, feature branches, Pull Requests, GitHub Actions, and Vercel Preview.
- Deployment: the `main` branch is published to Vercel Production.

## Implemented Features

- **Hero and Header:** professional introduction, responsive navigation, theme/language controls, Portuguese/English PDF resume downloads, and a lightweight stop-motion character that waves continuously and reacts to clicks/taps.
- **About Me:** professional background and approach to software development.
- **Technologies:** 36 technologies and competencies in six categories, with compact interactive details explaining practical implementation, coursework, ongoing study, or future plans. The mobile category selector remains horizontally scrollable and selection-centering.
- **Projects:** responsive cards, technology distribution charts, structured technical-detail dialogs, repository/live-demo links, and a mobile selector that shows one project at a time without expanding the viewport. Chart counts are manually maintained source-file associations from a 2026-11-07 project-repository snapshot, not live measurements or mutually exclusive language percentages.
- **Experience:** selectable professional timeline, responsibilities, contributions, relevant skills, and context-aware navigation to a related project; mobile selections are gently centered.
- **Education and Certifications:** academic background, 17 completed courses/certifications, detailed learning topics and verification mechanisms. A curated set of three qualifications is featured on both desktop and mobile; the full catalog and category filters remain available, with Java training marked as in progress.
- **Contact:** reusable, accessible dialog with Email, LinkedIn, GitHub, and WhatsApp links; a dedicated contact section and footer with direct links.
- **Internationalization:** Portuguese and English content throughout the interface.
- **Accessibility and responsiveness:** semantic elements, accessible dialogs and interactive states, keyboard interactions, reduced-motion support, and viewport-safe desktop/mobile layouts.
- **Navigation and motion:** responsive menu, section anchors, back-to-top control, and gentle scroll-triggered section reveals when motion is permitted.

The owner reports a **Google PageSpeed Insights result of 100/100 in Performance, Accessibility, Best Practices, and SEO** on 2026-11-09, following the recent refinements. The underlying report URL, device profile, and raw audit output have not yet been archived in this repository; this is an owner-reported measurement, not a new independently reproduced audit. See [Performance and Quality](docs/performance-and-quality.md) for provenance, limitations, and a repeatable validation checklist.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Application | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS v4, CSS custom properties |
| Icons and typography | Lucide React, local Devicon WOFF2 subset, small inline Simple Icons vectors, self-hosted Inter and Outfit fonts |
| Unit/component testing | Vitest, React Testing Library, jest-dom, user-event, jsdom |
| Browser E2E testing | Playwright Test (Chromium) |
| Code quality | ESLint, TypeScript compiler |
| Source control | Git, GitHub, GitHub Codespaces |
| Continuous integration | GitHub Actions |
| Deployment | Vercel Preview and Production |

Docker and AWS are **not** required to build or host the current portfolio. They may be evaluated in separate learning or infrastructure experiments.

### Technology catalog and evidence

The Technologies section is a **learning and project-experience catalog**, not a claim that every entry has been deployed to production or used professionally. Six compact categories group 36 items:

| Category | Items | Evidence examples |
| --- | ---: | --- |
| Front-End | 10 | React, Tailwind, TypeScript, and TanStack in published project code; Angular and Angular Material in [Project Form](https://github.com/AlexandroLeao/project-form); Bootstrap and jQuery in completed courses |
| Back-End & Data | 7 | Node, Express, REST, SQL, PostgreSQL, and Supabase in [Adventure Files](https://github.com/AlexandroLeao/rpg-character-creator); Java bootcamp in progress |
| Artificial Intelligence | 4 | Generative AI and LLMs in ongoing studies; agents and AI integration as future goals, not deployed model integrations |
| Cloud & DevOps Fundamentals | 6 | AWS, Azure, GCP, Docker, and Kubernetes in the completed FIAP cloud curriculum; GitHub Actions CI/CD in repository workflows |
| Quality & Testing | 3 | QA practices, Vitest unit/component tests, and Playwright browser E2E tests |
| Engineering & Tools | 6 | Git, GitHub, and Zod in projects; Scrum, UML, and UX/UI in completed coursework |

Each selected item displays one bilingual evidence label: **Implemented**, **Studied**, **Currently studying**, or **Plan to apply**. This status records the strongest supported context; studying a tool does not automatically imply professional or production experience. The portfolio does not claim Python, PyTorch, TensorFlow, Jira, Selenium, or Azure SQL Database experience by displaying unrelated icons. Icon concepts use Lucide and brand marks use small inline [Simple Icons](https://github.com/simple-icons/simple-icons) paths (CC0), avoiding an additional icon runtime package.

## Repository Structure

```text
.github/
  ISSUE_TEMPLATE/         Issue templates
  workflows/ci.yml       Pull Request CI
  workflows/playwright.yml  Playwright E2E tests on Pull Requests
public/
  images/                Responsive WebP mascot frames and project illustrations
  resumes/               Public Portuguese/English resume PDFs
  fonts/                 Self-hosted fonts and icon subset
  favicon.svg            Custom AL favicon
e2e/                    Playwright browser tests (`*.e2e.ts`)
src/
  components/            Reusable UI components and component tests
  data/                  Typed content for projects, experience, certifications, and contact
  utils/                 Mobile selection-centering helper and tests
  test/                  Shared test setup
  App.tsx                Main page, sections, and language integration
  App.test.tsx           Main application tests
  index.css              Global styles and theme tokens
index.html               HTML entry point and SEO metadata
playwright.config.ts     Playwright Chromium and Vite test configuration
docs/
  architecture.md         Architecture overview
  use-cases.md            Visitor use case catalog
  performance-and-quality.md  Audit provenance and verification guidance
  diagrams/               PlantUML diagrams
  decisions/              Architectural decision records
CONTRIBUTING.md          Development and review conventions
CHANGELOG.md             Post-release improvements and documentation history
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
| `npx playwright test --list` | Discover E2E cases without launching a browser |
| `npm run test:e2e` | Run Chromium E2E tests (browser installation required locally) |
| `npm run build` | Run TypeScript compilation and create the production build |
| `npm run preview` | Serve the production build locally for review |

## Testing and Quality

The suite contained **71 automated tests across 14 files** at the 2026-11-09 baseline. It covers the main application, language/theme behavior, character frames, mobile selection helpers, navigation, experience, projects, certification filtering and dialogs, contact channels, and the footer. The count is a snapshot, not a hard-coded target; check the test runner for the current total.

```bash
npm run lint
npm run test
npm run build
```

The Vitest suite exercises representative rendering, language/theme changes, expandable content, contact links, and modal/footer interactions.

### Browser E2E tests

Playwright adds a separate **Chromium browser** test layer without replacing Vitest. Issue #99 introduced five E2E tests that validate:

1. Opening the portfolio and switching from Portuguese to English.
2. Switching between light and dark modes.
3. Opening and closing Adventure Files project details.
4. Downloading the correct Portuguese and English PDF resumes.
5. Opening the mobile menu, navigating to projects, and selecting a different project at a 375 px viewport.

Issue #105 adds five further browser checks for keyboard-operated contact/project dialogs and focus restoration, PT/EN contact/project link targets, reduced-motion behavior, and page-wide horizontal overflow at mobile, tablet, and desktop widths. The suite now contains **10 Chromium E2E tests** across `e2e/portfolio.e2e.ts` and `e2e/accessibility-and-layout.e2e.ts`. The `.e2e.ts` naming keeps them separate from Vitest. Playwright starts the Vite development server automatically. External links are inspected, not opened in tests.

### Automated accessibility tests (P3)

A development-only `@axe-core/playwright` suite in `e2e/axe-accessibility.e2e.ts` checks WCAG 2.0–2.2 Level A/AA rules in Chromium: the homepage in PT/EN and light/dark themes, contact/project/certification dialogs in both languages, and a narrow mobile viewport. Failures report rule IDs and DOM targets. The existing `npm run test:e2e` command and Playwright PR workflow run these checks without adding any runtime dependency to the deployed app.

The PR #108 validation passed **21/21 Chromium Playwright scenarios** (10 functional regression tests plus 11 axe-core audits) and the regular CI checks, including 72 Vitest tests, on 2026-11-11. See [the quality guide](docs/performance-and-quality.md) for run links and limitations. Automated checks do not establish WCAG conformance or replace manual keyboard, screen-reader and real-device verification.

```bash
npx playwright test --list   # No browser download needed
npx playwright install chromium   # Optional: local browser setup
npm run test:e2e             # Run E2E tests locally
```

To avoid installing browser binaries on constrained devices, use the GitHub Actions workflow instead. These automated checks do not replace manual accessibility review or performance audits.

### Lighthouse CI (P4)

An independent [Lighthouse CI workflow](.github/workflows/lighthouse.yml) audits the **built static site** (`dist/`) on Pull Requests to `main`. It runs three samples each in separate **mobile and desktop** jobs using pinned `@lhci/cli@0.16.0` (Lighthouse 13.6.0), with explicit median score warnings for Performance, Accessibility, Best Practices, and SEO. Stable title and description checks, accessible zoom support, and responsive viewport width are enforced as errors (the viewport width check inspects built HTML because Lighthouse 13 replaced its earlier viewport audit). The installed Chrome version is logged; scores can still vary by CI runner and browser. Lighthouse collection failures block the workflow, while category scores remain advisory until the initial baseline is reviewed.

The reports are retained as GitHub Actions HTML/JSON artifacts for seven days, using filesystem upload only: no external report hosting, secrets, application dependencies, or third-party service accounts. The workflow measures **a local production build**, not Vercel Production, PageSpeed Insights, field Core Web Vitals, or a WCAG certification.

Local reproduction (requires Node.js 24 and Chrome):

```bash
npm ci
npm run build
npm install --global @lhci/cli@0.16.0
LHCI_DEVICE=mobile lhci autorun
LHCI_DEVICE=desktop lhci autorun
```

Running both profiles sequentially locally overwrites the generated reports unless the first output is copied elsewhere; CI runs them in separate jobs and artifacts. See [Performance and Quality](docs/performance-and-quality.md) for evidence and threshold policy.

### Continuous Integration

GitHub Actions runs the [Continuous Integration workflow](.github/workflows/ci.yml) on Pull Requests targeting `main`. The job:

1. Checks out the repository.
2. Sets up Node.js 24 and npm caching.
3. Installs dependencies with `npm ci`.
4. Runs `npm run lint`.
5. Runs `npm run test`.
6. Runs `npm run build`.

A failed step fails the CI job. Additionally, the [Playwright E2E Tests workflow](.github/workflows/playwright.yml) and [Lighthouse CI workflow](.github/workflows/lighthouse.yml) run on Pull Requests to `main`. It installs Chromium in headless-shell mode on a standard GitHub-hosted Ubuntu runner, runs the browser tests, and retains test artifacts briefly. The workflow does not depend on local Cloud Shell browser installations.

Vercel deployment checks are handled separately from these GitHub Actions workflows.

## Technical Documentation

The repository includes current architecture and use-case documentation, an audit-evidence record, a dated changelog, engineering conventions, and architectural decisions.

- [Changelog](CHANGELOG.md)
- [Performance and Quality](docs/performance-and-quality.md)

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
- [ADR 0004 — Accessible Motion and Viewport-Safe Mobile Navigation](docs/decisions/0004-accessible-motion-mobile-navigation.md)

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
- [x] Establish and expand automated component/application tests (72 passing tests across 14 files as of 2026-11-11).
- [x] Introduce five Chromium Playwright E2E tests with Pull Request CI (Issue #99).
- [x] Expand browser regression coverage to 10 scenarios, including keyboard, reduced motion, links, and viewport overflow (Issue #105).
- [x] Add 11 axe-core WCAG A/AA audits for PT/EN and representative dialogs; fix confirmed accessible-name issues and pass CI (Issue #107, PR #108).
- [x] Integrate Lighthouse CI (P4) for production-build mobile/desktop measurements, median advisory thresholds and seven-day artifacts (Issue #109, merged PR #110; [latest PR CI run](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43105981242), [Playwright](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43105981248), [Lighthouse](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43105981330)).
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
- [x] Purchase the custom domain alexandroleao.com.br.
- [x] Complete custom domain DNS configuration and verification.
- [x] Update canonical URLs and social metadata for the verified domain.
- [x] Create Portuguese and English resume PDFs.
- [x] Enable and validate language-specific resume downloads.
- [x] Complete final production QA review (Issue #39).
- [x] Complete final release-readiness checks.
- [x] Publish the first stable release (v1.0.0).
- [x] Update and expand technical project documentation.
- [x] Document software architecture and UML diagrams.
- [x] Record significant architectural decisions using ADRs.
- [x] Add a stop-motion Hero mascot with a separate click/tap reaction and responsive WebP frames.
- [x] Keep mobile project and category selectors inside the viewport, with subtle selection centering.
- [x] Refine project-details dialogs, experience navigation, and certification card consistency.
- [x] Curate three featured qualifications on desktop and mobile while retaining the full catalog.
- [x] Add scroll-reveal transitions with reduced-motion behavior.
- [x] Document the owner-reported 2026-11-09 PageSpeed Insights results in all four categories.
- [x] Audit the 36-item technology catalog, evidence labels, and icon accuracy (Issue #97, PR #103).
- [x] Complete the post-merge mobile/desktop, language/theme, keyboard, reduced-motion, and external-link review (owner-confirmed on 2026-11-11; see the quality guide).

### Next steps — approved cross-project sequence

The portfolio's **P1–P4 quality cycle is completed** as of 2026-11-11: P1 content/evidence review ([Issue #97](https://github.com/AlexandroLeao/developer-portfolio/issues/97)), P2 browser regression coverage ([PR #106](https://github.com/AlexandroLeao/developer-portfolio/pull/106)), P3 automated accessibility checks ([PR #108](https://github.com/AlexandroLeao/developer-portfolio/pull/108)), and P4 repeatable mobile/desktop Lighthouse CI ([PR #110](https://github.com/AlexandroLeao/developer-portfolio/pull/110)). The closing documentation review is tracked in [Issue #111](https://github.com/AlexandroLeao/developer-portfolio/issues/111) / [PR #112](https://github.com/AlexandroLeao/developer-portfolio/pull/112). Automated results and owner-reported manual checks retain distinct evidence labels.

The [Adventure Files](https://github.com/AlexandroLeao/rpg-character-creator) **MVP was accepted on 2026-11-05**; that completed product milestone is **not** evidence that the separately planned R1–R6 engineering improvements have been implemented. Following the agreed portfolio → RPG → portfolio update → external open-source sequence, the remaining work is:

- [ ] **R1 — RPG technical baseline:** recheck the current frontend/API/database test results, CI, free-tier hosting risks, and documentation without modifying production data.
- [ ] **R2 — Targeted security hardening:** evaluate private API response caching (including direct Render responses), logging hygiene, and narrow regression tests; do not label an unverified concern a vulnerability.
- [ ] **R3 — OpenAPI contract:** document the existing authenticated API, errors, health endpoint, and examples without inventing new endpoints.
- [ ] **R4 — Reproducible backend:** add an isolated, non-root Docker development path and, when a compatible local container environment is available, verify database tests without production credentials.
- [ ] **R5 — Full-stack Playwright:** test existing account and six-stage creator flows, exports, PT/EN, session recovery, and account isolation using disposable **local** data only.
- [ ] **R6 — Optional operational checks:** consider CSP Report-Only, selective rate limiting, and safe structured logs only if the additional maintenance is justified.
- [ ] **R7 — One consolidated portfolio update:** after verified RPG improvements, refresh Adventure Files descriptions/stack evidence in PT/EN and rerun the portfolio quality gates before any new portfolio PR.
- [ ] **O1–O3 — First external open-source contribution:** only after R7, select a suitable issue, submit a focused tested PR, and record its actual review/merge state.

Each new RPG change requires its own justified Issue, reviewable branch and PR. The project owner retains merge approval. The target is **R$ 0 in new services**, with no paid runners, new paid hosting, or production-data experiments.

### Deferred / Future Improvements

- [ ] **P5 (optional):** add selective Firefox/WebKit or stable visual-regression checks only if a concrete need justifies them; P5 does not block the move to R1.
- [ ] Revise Portuguese/English résumé content and LinkedIn only after the RPG and external open-source phases, using verified evidence.
- [ ] Reevaluate a separate project to address real stack gaps **after** the above sequence; do not start one now.
- [ ] Reevaluate adding the Developer Portfolio itself to the Projects section.
- [ ] Consider future AWS or other cloud learning experiments separately, subject to explicit approval and zero-new-cost constraints; the portfolio itself does not require Docker or AWS.

The roadmap reflects completed and planned work. The latest PageSpeed Insights scores are recorded as an owner-reported snapshot; results may vary between devices, networks, and audit runs, and do not establish accessibility conformance.

## Project Management

Work is tracked in [GitHub Issues](https://github.com/AlexandroLeao/developer-portfolio/issues). Pull Requests document changes, verification results, and related issues.

For further process details, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Author

**Alexandro Milhomes Leão**

- [GitHub](https://github.com/AlexandroLeao)
- [LinkedIn](https://www.linkedin.com/in/alexandroleao/)

## License

No license has been selected for this repository. Do not assume that its source code or assets are available for reuse under an open-source license.
