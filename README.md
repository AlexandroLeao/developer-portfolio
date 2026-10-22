
# Developer Portfolio

A bilingual, responsive developer portfolio built with React, TypeScript, and modern software engineering practices.

## About the Project

This project showcases professional experience, technical skills, software projects, and certifications.

Beyond the user interface, it is also a practical software engineering project focused on planning, version control, code quality, documentation, testing, and continuous integration.

## Current Status

**In active development.**

The initial application, CI workflow, and the Hero, About Me, and Technologies sections have been implemented and merged into `main`.

The Projects, Experience, Certifications, and Contact sections are planned for future iterations.

## Tech Stack

### Application

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React
- Devicon icons

### Development and Quality

- Git and GitHub
- GitHub Codespaces
- ESLint
- TypeScript compilation
- GitHub Actions

### Deployment

- Vercel Preview deployments

Production deployment configuration and release procedures will be reviewed before the first stable release.

## Implemented Features

- Responsive Hero section with professional introduction
- About Me section
- Categorized, interactive Technologies section
- Portuguese and English language support
- Light and dark themes
- Responsive navigation and mobile menu
- Scroll-aware header
- Back-to-top navigation
- Animated scroll indicator
- Continuous Integration for pull requests targeting `main`

## Getting Started

### Prerequisites

- Node.js 24
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/AlexandroLeao/developer-portfolio.git
cd developer-portfolio
```

Install dependencies:

```bash
npm ci
```

### Development

Start the development server:

```bash
npm run dev
```

### Code Quality

Run ESLint:

```bash
npm run lint
```

### Production Build

Run TypeScript compilation and the Vite production build:

```bash
npm run build
```

### Production Preview

Preview the built application locally:

```bash
npm run preview
```

## Development Workflow

The project follows an Issue-driven, feature-branch workflow:

1. Plan the task and define acceptance criteria.
2. Create or select a GitHub Issue.
3. Create a dedicated branch from an updated `main`.
4. Implement the task in focused changes.
5. Validate the implementation.
6. Commit changes using Conventional Commits.
7. Push the branch and open a Pull Request.
8. Review the changes and CI results.
9. Merge into `main` when the acceptance criteria are met.
10. Verify the related Issue and update documentation.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed conventions, review practices, and the Definition of Done.

## Continuous Integration

GitHub Actions runs on pull requests targeting `main`.

The current workflow:

1. Checks out the repository.
2. Configures Node.js 24.
3. Installs dependencies with `npm ci`.
4. Runs `npm run lint`.
5. Runs `npm run build`.

Automated unit, integration, and end-to-end tests are planned for future iterations.

## Roadmap

### Completed

- [x] Initialize React, TypeScript, and Vite
- [x] Configure ESLint
- [x] Configure Tailwind CSS
- [x] Configure GitHub Actions CI
- [x] Implement the Hero section
- [x] Implement the About Me section
- [x] Implement the Technologies section
- [x] Add bilingual support
- [x] Add light and dark themes
- [x] Implement responsive navigation

### In Progress

- [ ] Standardize project documentation and development workflow

### Planned

- [ ] Establish initial automated tests
- [ ] Review `main` branch protection
- [ ] Implement the Projects section
- [ ] Implement the Experience section
- [ ] Implement the Certifications section
- [ ] Implement the Contact section
- [ ] Provide Portuguese and English résumé PDFs
- [ ] Expand unit and integration tests
- [ ] Add end-to-end tests with Playwright
- [ ] Improve accessibility and performance
- [ ] Extend CI/CD and security checks
- [ ] Evaluate Docker and AWS adoption
- [ ] Review SEO and project documentation
- [ ] Validate production deployment
- [ ] Evaluate a custom domain
- [ ] Publish the first stable release (`v1.0.0`)

## Project Management

Development tasks are tracked using [GitHub Issues](https://github.com/AlexandroLeao/developer-portfolio/issues).

Pull Requests document implementation details, validation, and related Issues.

The proposed Kanban workflow is documented in [CONTRIBUTING.md](CONTRIBUTING.md).

## Author

**Alexandro Milhomes Leão**

## License

No license has been selected yet.
