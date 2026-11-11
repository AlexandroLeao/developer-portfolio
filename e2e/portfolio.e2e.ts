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

test('opens and closes project details', async ({ page }) => {
  await page.goto('/')

  // Find the Adventure Files project
  const project = page.locator('#project-adventure-files')

  await expect(project).toBeVisible()

  // Open project details
  await project.getByRole('button', {
    name: 'Detalhes',
  }).click()

  // Verify that the dialog opened
  const dialog = page.getByRole('dialog', {
    name: 'Adventure Files',
  })

  await expect(dialog).toBeVisible()

  // Verify real project information
  await expect(dialog).toContainText('Criador em 6 etapas')

  // Close project details
  await dialog.getByRole('button', {
    name: 'Fechar detalhes',
  }).click()

  await expect(dialog).not.toBeVisible()
})

test('downloads Portuguese and English resumes', async ({ page }) => {
  await page.goto('/')

  // Download the Portuguese resume
  const portugueseResume = page.getByRole('link', {
    name: 'Baixar currículo em PDF',
  })

  await expect(portugueseResume).toHaveAttribute(
    'href',
    '/resumes/alexandro-leao-curriculo-pt.pdf',
  )

  const portugueseDownloadPromise = page.waitForEvent('download')

  await portugueseResume.click()

  const portugueseDownload = await portugueseDownloadPromise

  expect(portugueseDownload.suggestedFilename()).toBe(
    'alexandro-leao-curriculo-pt.pdf',
  )

  // Switch to English
  await page.getByRole('button', {
    name: 'EN',
    exact: true,
  }).click()

  // Download the English resume
  const englishResume = page.getByRole('link', {
    name: 'Download résumé as PDF',
  })

  await expect(englishResume).toHaveAttribute(
    'href',
    '/resumes/alexandro-leao-resume-en.pdf',
  )

  const englishDownloadPromise = page.waitForEvent('download')

  await englishResume.click()

  const englishDownload = await englishDownloadPromise

  expect(englishDownload.suggestedFilename()).toBe(
    'alexandro-leao-resume-en.pdf',
  )
})