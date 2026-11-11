import { test, expect } from '@playwright/test'

test('opens the portfolio and switches languages', async ({ page }) => {
  // Open the portfolio
  await page.goto('/')

  // Verify the main heading
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Alexandro Leão',
    }),
  ).toBeVisible()

  // Verify the default Portuguese content
  await expect(page.locator('#skills-title')).toContainText('Tecnologias')

  // Switch to English
  await page.getByRole('button', {
    name: 'EN',
    exact: true,
  }).click()

  // Verify the English language and content
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')

  await expect(page.locator('#skills-title')).toContainText('Technologies')
})

test('switches between light and dark themes', async ({ page }) => {
  await page.goto('/')

  const html = page.locator('html')

  // The portfolio starts in light mode
  await expect(html).not.toHaveClass(/\bdark\b/)

  // Switch to dark mode
  await page.getByRole('button', {
    name: 'Ativar tema escuro',
  }).click()

  await expect(html).toHaveClass(/\bdark\b/)

  // Switch back to light mode
  await page.getByRole('button', {
    name: 'Ativar tema claro',
  }).click()

  await expect(html).not.toHaveClass(/\bdark\b/)
})