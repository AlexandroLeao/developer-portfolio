import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Automated WCAG 2.0/2.1/2.2 A/AA rules complement manual accessibility QA.
const ruleTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

async function audit(page: Page, scenario: string, within?: string) {
  // Wait for finite UI transitions so contrast checks use settled colors.
  await page.evaluate(async () => {
    const activeTransitions = document.getAnimations().filter((animation) =>
      animation.playState === 'running' && animation.effect?.getComputedTiming().iterations !== Infinity,
    )
    await Promise.all(activeTransitions.map((animation) => animation.finished.catch(() => undefined)))
  })

  let builder = new AxeBuilder({ page }).withTags(ruleTags)
  if (within) builder = builder.within(within)
  const result = await builder.analyze()
  const violations = result.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    nodes: violation.nodes.map((node) => ({
      target: node.target,
      failureSummary: node.failureSummary,
    })),
  }))
  expect(violations, 'axe-core WCAG findings: ' + scenario).toEqual([])
}

const languages = [
  { code: 'pt', contact: 'Entrar em contato', dialog: 'Vamos conversar?', details: 'Detalhes', certificate: 'Ver detalhes', dark: 'Ativar tema escuro' },
  { code: 'en', contact: 'Get in touch', dialog: "Let's connect!", details: 'Details', certificate: 'View details', dark: 'Switch to dark mode' },
] as const

for (const lang of languages) {
  test.describe('axe-core WCAG A/AA in ' + lang.code, () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')
      if (lang.code === 'en') await page.getByRole('button', { name: 'EN', exact: true }).click()
    })

    test('homepage light theme', async ({ page }) => {
      await audit(page, lang.code + ' homepage light')
    })

    test('homepage dark theme', async ({ page }) => {
      await page.getByRole('button', { name: lang.dark }).click()
      await audit(page, lang.code + ' homepage dark')
    })

    test('contact dialog', async ({ page }) => {
      await page.locator('[aria-labelledby="hero-title"]').getByRole('button', { name: lang.contact }).click()
      await expect(page.getByRole('dialog', { name: lang.dialog })).toBeVisible()
      await audit(page, lang.code + ' contact dialog', '[role="dialog"]')
    })

    test('project details dialog', async ({ page }) => {
      await page.locator('#project-adventure-files').getByRole('button', { name: lang.details, exact: true }).click()
      await expect(page.getByRole('dialog', { name: 'Adventure Files' })).toBeVisible()
      await audit(page, lang.code + ' project details', 'dialog[open]')
    })

    test('certification details dialog', async ({ page }) => {
      await page.locator('#certifications').getByRole('button', { name: lang.certificate, exact: true }).first().click()
      await expect(page.locator('#certifications dialog[open]')).toBeVisible()
      await audit(page, lang.code + ' certification details', '#certifications dialog[open]')
    })
  })
}

test('axe-core WCAG A/AA at mobile width 375px', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await audit(page, 'pt mobile homepage')
})
