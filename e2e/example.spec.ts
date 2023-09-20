import { test, expect } from '@playwright/test'

test('should navigate to home page',async ({ page }) => {
    // Start from the index page (the baseURL is set via playwright.config.ts)
    await page.goto('http://localhost:3000')
    
    // Find an element with the text 'Shad CN Test' and click on it
    await page.click('text=ShadCN Test')

    // The current page in view should contain a paragraph text with  "sample change"
    await expect(page.locator('p')).toContainText('sample change')
})
