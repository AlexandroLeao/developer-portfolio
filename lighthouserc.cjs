// Lighthouse CI audits the production Vite build, not the development server.
// Run mobile/desktop separately so each profile has its own median and artifact.
const device = process.env.LHCI_DEVICE || 'mobile'
if (!['mobile', 'desktop'].includes(device)) {
  throw new Error(`Unsupported LHCI_DEVICE: ${device}`)
}

const medianWarning = (minimum) => ['warn', { minScore: minimum, aggregationMethod: 'median' }]

module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: ['http://localhost/'],
      numberOfRuns: 3,
      settings: {
        ...(device === 'desktop' ? { preset: 'desktop' } : {}),
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        // Scores are advisory until a stable repository-specific baseline is archived.
        'categories:performance': medianWarning(0.85),
        'categories:accessibility': medianWarning(0.95),
        'categories:best-practices': medianWarning(0.90),
        'categories:seo': medianWarning(0.90),

        // Stable metadata invariants already required by the portfolio.
        'document-title': ['error', { minScore: 1 }],
        'meta-description': ['error', { minScore: 1 }],
        'viewport': ['error', { minScore: 1 }],
      },
    },
    // No external LHCI server or temporary public storage.
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports',
    },
  },
}
