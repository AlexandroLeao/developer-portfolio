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