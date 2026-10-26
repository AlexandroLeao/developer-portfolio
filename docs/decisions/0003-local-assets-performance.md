# ADR 0003: Local Fonts and Optimized Static Assets

## Status

Accepted — documented retrospectively.

## Context

The portfolio includes a prominent Hero illustration,
project imagery, typography, and technology icons.

Early performance audits identified opportunities to
improve initial loading, especially on mobile networks.

The visual identity needed to remain unchanged.

## Decision

Optimize static assets while preserving the approved
design and existing interactions.

### Images

- Use responsive WebP versions of Hero and project images.
- Use srcSet and sizes where appropriate.
- Prioritize the Hero image for initial loading.
- Lazy-load applicable project imagery.

### Typography

- Self-host Inter and Outfit variable WOFF2 fonts.
- Use local CSS declarations rather than runtime
  Google Fonts stylesheets.

### Technology Icons

- Replace the external Devicon stylesheet and font
  with a local CSS subset and WOFF2 font.
- Preserve the 27 required icon glyphs and mappings.
- Retain applicable font license notices.

## Rationale

Locally hosted assets eliminate runtime font requests
to external font services.

Image variants allow browsers to select a more suitable
resource for different viewport sizes.

The Devicon subset avoids downloading unused glyphs.

## Alternatives and Scope

Keeping externally hosted fonts was a valid simpler
starting point but retained third-party network requests.

Removing existing illustrations or redesigning cards
was not necessary to achieve the desired improvements.

## Consequences

### Benefits

- Smaller Devicon font payload.
- Fewer external resource dependencies.
- Responsive image delivery.
- Preserved typography and visual identity.

### Trade-offs

- Local font and icon assets require project maintenance.
- Adding new technology icons may require regenerating
  the Devicon subset.
- Performance results may vary between Lighthouse runs.

## Validation

Production Lighthouse audits achieved a score of
100/100 in Performance, Accessibility, Best Practices,
and SEO in a recorded run.

These values are individual laboratory measurements,
not a guarantee of permanent scores or full WCAG
conformance.

## Evidence

- public/fonts/
- public/images/
- src/styles/local-fonts.css
- src/styles/devicon-subset.css
- src/index.css
- src/App.tsx
- index.html
- GitHub Issues #25, #27, and #29
