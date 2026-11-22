import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('F01: User Registration & Profile Setup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register')
  })

  test.afterEach(async ({ page }) => {
    // Check for console errors
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    // Check for 5xx errors
    const responses: { status: number }[] = []
    page.on('response', response => {
      if (response.status() >= 500) {
        responses.push({ status: response.status() })
      }
    })

    if (consoleErrors.length > 0) {
      console.error('Console errors:', consoleErrors)
    }
    expect(consoleErrors.length).toBe(0)
    expect(responses.length).toBe(0)

    // Run accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('F01-H1: Happy path - Submit registration → profile setup → home', async ({ page }) => {
    // 1. Fill registration form
    await page.getByLabel('Full Name').fill('Test User')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Password').fill('password123')

    // 2. Submit registration
    await page.getByRole('button', { name: /sign up/i }).click()

    // 3. Should redirect to onboarding
    await expect(page).toHaveURL(/.*onboarding/)

    // 4. Complete onboarding
    await page.getByLabel('Name').fill('Test User')
    await page.getByLabel('Bio').fill('I love testing!')

    // Add an interest
    await page.getByPlaceholder('Add interest (press Enter)').fill('coding')
    await page.keyboard.press('Enter')

    // 5. Complete profile
    await page.getByRole('button', { name: /complete profile/i }).click()

    // 6. Should redirect to home
    await expect(page).toHaveURL(/.*home/)
    await expect(page.getByText(/your matches/i)).toBeVisible()
  })

  test('F01-E1: Empty fields show validation error', async ({ page }) => {
    await page.getByRole('button', { name: /sign up/i }).click()
    await expect(page.getByText(/please fill in all fields/i)).toBeVisible()
  })

  test('F01-E2: Invalid email format shows error', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Test User')
    await page.getByLabel('Email').fill('invalid-email')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: /sign up/i }).click()
    // Check for HTML5 validation or custom error
    await expect(page.getByLabel('Email')).toHaveAttribute('type', 'email')
  })

  test('F01-E3: Short password shows error', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Test User')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Password').fill('123')
    await page.getByRole('button', { name: /sign up/i }).click()
    await expect(page.getByText(/at least 8 characters/i)).toBeVisible()
  })

  test('F01-E5: Emoji in name is accepted', async ({ page }) => {
    await page.getByLabel('Full Name').fill('Test User 😀')
    await page.getByLabel('Email').fill('test2@example.com')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: /sign up/i }).click()
    await expect(page).toHaveURL(/.*onboarding/)
  })

  test('F01-E13: Keyboard navigation works', async ({ page }) => {
    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Full Name')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Email')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.getByLabel('Password')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: /sign up/i })).toBeFocused()
  })

  test('F01-E14: Screen reader labels are correct', async ({ page }) => {
    await expect(page.getByLabel('Full Name')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible()
  })
})