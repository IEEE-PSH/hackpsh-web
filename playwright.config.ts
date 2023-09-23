import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    // Runs your local dev server before starting the tests
    webServer: {
        command: 'pnpm run dev',
        url: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
        stdout: 'ignore',
        stderr: 'pipe',
        timeout: 120 * 1000, // Waiting two minutes (maximum) until web server spins online
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] }
        },

        /* Test against mobile view ports. */
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] }
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] }
        },

        /* Test against branded browsers. */
        {
            name: 'edge',
            use: {
                ...devices['Desktop Edge'],
                channel: 'msedge'
            },
        },
    ],
    reporter: process.env.CI ? 'github' : 'list'
})
