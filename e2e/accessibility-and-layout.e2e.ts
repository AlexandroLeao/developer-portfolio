import { expect, test } from '@playwright/test'

test('keeps focus inside the contact dialog and restores it on Escape', async ({ page }) => {
  await page.goto('/')

  const trigger = page.locator('[aria-labelledby="hero-title"]').getByRole('button', {
    name: 'Entrar em contato',
  })
  await trigger.focus()
  await page.keyboard.press('Enter')

  const dialog = page.getByRole('dialog', { name: 'Vamos conversar?' })
  const closeButton = dialog.getByRole('button', { name: 'Fechar contatos' })
  const lastLink = dialog.getByRole('link', { name: /Iniciar conversa com Alexandro Leão no WhatsApp/ })

  await expect(dialog).toBeVisible()
  await expect(closeButton).toBeFocused()

  // Reverse tabbing from the first control wraps to the last contact link.
  await page.keyboard.press('Shift+Tab')
  await expect(lastLink).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

test('exposes correct contact and project links in Portuguese and English', async ({ page }) => {
  await page.goto('/')

  await page.locator('[aria-labelledby="hero-title"]').getByRole('button', {
    name: 'Entrar em contato',
  }).click()

  const dialog = page.getByRole('dialog', { name: 'Vamos conversar?' })
  await expect(dialog.getByRole('link', { name: /Enviar e-mail para Alexandro Leão/ }))
    .toHaveAttribute('href', 'mailto:alexmilhomes.aml@gmail.com')
  await expect(dialog.getByRole('link', { name: /Visitar o LinkedIn de Alexandro Leão/ }))
    .toHaveAttribute('href', 'https://www.linkedin.com/in/alexandroleao/')
  await expect(dialog.getByRole('link', { name: /Visitar o GitHub de Alexandro Leão/ }))
    .toHaveAttribute('href', 'https://github.com/AlexandroLeao')
  await expect(dialog.getByRole('link', { name: /Iniciar conversa com Alexandro Leão no WhatsApp/ }))
    .toHaveAttribute('href', 'https://wa.me/5591988930042')

  await dialog.getByRole('button', { name: 'Fechar contatos' }).click()
  await page.getByRole('button', { name: 'EN', exact: true }).click()

  await page.locator('[aria-labelledby="hero-title"]').getByRole('button', {
    name: 'Get in touch',
  }).click()

  const englishDialog = page.getByRole('dialog', { name: "Let's connect!" })
  await expect(englishDialog.getByRole('link', { name: /Send an email to Alexandro Leão/ }))
    .toHaveAttribute('href', 'mailto:alexmilhomes.aml@gmail.com')
  await expect(englishDialog.getByRole('link', { name: /Visit Alexandro Leão's GitHub profile/ }))
    .toHaveAttribute('target', '_blank')
  await expect(englishDialog.getByRole('link', { name: /Visit Alexandro Leão's GitHub profile/ }))
    .toHaveAttribute('rel', 'noopener noreferrer')

  await englishDialog.getByRole('button', { name: 'Close contacts' }).click()

  const project = page.locator('#project-adventure-files')
  await expect(project.getByRole('link', { name: /Adventure Files — GitHub/ }))
    .toHaveAttribute('href', 'https://github.com/AlexandroLeao/rpg-character-creator')
  await expect(project.getByRole('link', { name: /Adventure Files — Visit/ }))
    .toHaveAttribute('href', 'https://adventure-files-staging.vercel.app/')
})

test('opens and closes project details using only the keyboard', async ({ page }) => {
  await page.goto('/')

  const trigger = page.locator('#project-adventure-files').getByRole('button', {
    name: 'Detalhes',
  })
  await trigger.focus()
  await page.keyboard.press('Enter')

  const dialog = page.getByRole('dialog', { name: 'Adventure Files' })
  await expect(dialog).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

test('respects reduced-motion preferences for animations and reveals', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.locator('.hero-mascot-base')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.hero-mascot-wave')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
  await expect(page.locator('.technology-card').first()).toHaveCSS('transition-duration', '0s')
  await expect(page.locator('[data-reveal-on-scroll]').first())
    .not.toHaveClass(/reveal-pending/)
})

test('prevents page-wide horizontal overflow at mobile, tablet and desktop widths', async ({ page }) => {
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    for (const section of ['#skills', '#projects', '#contact']) {
      await page.locator(section).scrollIntoViewIfNeeded()

      const dimensions = await page.evaluate(() => ({
        content: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }))

      expect(
        dimensions.content,
        `Page overflowed at ${width}px while viewing ${section}`,
      ).toBeLessThanOrEqual(dimensions.viewport + 1)
    }
  }
})
