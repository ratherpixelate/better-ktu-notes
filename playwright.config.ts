import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: 'list',
  timeout: 30000,
  webServer: {
    command: 'npx next dev -p 3000',
    port: 3000,
    reuseExistingServer: true,
    timeout: 60000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
