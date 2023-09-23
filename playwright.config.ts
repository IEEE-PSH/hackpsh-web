import { defineConfig, devices } from '@playwright/test'
import path from 'path'

export default defineConfig({
    // Timeout per test
    timeout: 60 * 1000,
    // Test Directory
    testDir: path.join(__dirname, 'e2e'),
    // If a test fails, retry it additional 2 times
    retries: 2,
    // Artifacts folder where screenshots, videos, and traces are stored.
    outputDir: 'test-results/',

    use: {
        // Retry a test if its failing with enabled tracing.
        // Allows for us to analyze DOM, console logs, network traffic, etc.
        trace: 'retry-with-trace',
        baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000'
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
