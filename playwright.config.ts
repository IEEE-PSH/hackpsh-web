import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    // Runs your local dev server before starting the tests
    webServer: {
        command: 'pnpm run dev',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
        stdout: 'ignore',
        stderr: 'pipe',
        timeout: 120 * 1000,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome']}
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox']}
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari']}
        },

        /* Test against mobile view ports. */
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5']}
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12']}
        },

        /* Test against branded browsers. */
        {
            name: 'edge',
            use: {
            ...devices['Desktop Edge'],
            channel: 'msedge'
            },
        },
    ]
})