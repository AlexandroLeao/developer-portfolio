# Lighthouse CI Evidence — 2026-11-11 (PR #112)

This is a **durable, source-attributed summary of inspected JSON reports**, not a claim about production-origin measurements or permanent scores.

## Source and scope

- Repository: `AlexandroLeao/developer-portfolio`.
- Pull Request: [#112](https://github.com/AlexandroLeao/developer-portfolio/pull/112), final tested head commit `d243edeb8135124e68303a0d7f4199e6e15edc86`; merged into `main` as `d0b50e4a7f5db23bab30af7a0321eee424f293ee` on 2026-11-11.
- Workflow: [Lighthouse CI run #43116965693](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43116965693); **both mobile and desktop jobs succeeded**.
- Tested page: Vite production build (`dist/`) served by Lighthouse CI's **local runner static server**, using transient loopback URLs `http://localhost:46339/` (mobile) and `http://localhost:36461/` (desktop). Those ports are not public production URLs.
- Lighthouse version: **13.6.0**; user agent: **HeadlessChrome/156.0.0.0** on Linux; UTC timestamps in original JSON below.
- Six JSON reports were inspected directly from the two downloaded GitHub Actions artifact ZIPs. The three runs for each form factor are separate samples.

## Original Lighthouse category scores (0–100)

| Form factor | Fetch time (UTC) | Performance | Accessibility | Best Practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| Mobile | 2026-11-11 23:05:18 | 84 | 100 | 100 | 100 |
| Mobile | 2026-11-11 23:05:31 | 98 | 100 | 100 | 100 |
| Mobile | 2026-11-11 23:05:42 | 97 | 100 | 100 | 100 |
| **Mobile median** | **3 samples** | **97** | **100** | **100** | **100** |
| Desktop | 2026-11-11 23:05:58 | 76 | 100 | 100 | 100 |
| Desktop | 2026-11-11 23:06:13 | 98 | 100 | 100 | 100 |
| Desktop | 2026-11-11 23:06:24 | 100 | 100 | 100 | 100 |
| **Desktop median** | **3 samples** | **98** | **100** | **100** | **100** |

Scores are rounded from `categories.{performance,accessibility,best-practices,seo}.score * 100` in each archived `lighthouse-reports/*.report.json`. Medians are calculated independently per category, across each form factor's three JSON reports. The performance variation (mobile 84–98; desktop 76–100) illustrates why a single score cannot be promised.

## Original artifact provenance

| Artifact | GitHub artifact ID | ZIP SHA-256 | GitHub retention expiry (UTC) |
| --- | ---: | --- | --- |
| `lighthouse-mobile` | `13897754323` | `33947972e5fa68332a32f5e286ee491f3cf2bea3061d0674b79cb9b9612c8fef` | 2026-11-18 23:05:52 |
| `lighthouse-desktop` | `13899625670` | `733dbf8f2683bdf47bc70360983c797baffab27bd20eacab6aef96d00c4e7aeb` | 2026-11-18 23:06:34 |

The ZIPs were downloaded and integrity-checked (ZIP CRC test) for this 2026-11-11 review. The GitHub Actions files expire after seven days by repository policy. **The raw ZIP files are not committed to this repository**; retain personal offline copies if later forensic or line-by-line review is needed. This Markdown summary remains available after artifact expiry but is not a substitute for those original files.

## Verification boundary

- [x] Original GitHub-hosted mobile and desktop JSON files inspected and scored.
- [x] Six sample timestamps, device profiles, local URLs, version, hashes, and source run recorded.
- [x] [Continuous Integration](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43116965638) and [Playwright E2E](https://github.com/AlexandroLeao/developer-portfolio/actions/runs/43116965506) succeeded on the same PR head commit.
- [x] GitHub reported Vercel deployment status `success` for merge commit `d0b50e4`.
- [ ] Independent real-browser visual inspection of the public production site **was not performed** in this documentation review.
- [ ] The original **2026-11-09 PageSpeed Insights** report URL/JSON and mobile/desktop device profile are not archived. Its 100/100 figures remain *owner-reported historical values* only.
- [ ] The owner's earlier Cloud Shell 2026-11-11 Lighthouse medians (**96 mobile Performance, 100 desktop Performance**) come from another environment and are **not** these GitHub CI medians.

This inspection does **not** prove full WCAG compliance, real-user Core Web Vitals, or that the live public site always achieves the scores above. No paid service, production credentials, or live-user data were involved.
