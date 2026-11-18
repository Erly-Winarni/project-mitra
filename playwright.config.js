// Konfigurasi Playwright untuk SkillMatch (Next.js)
const { BASE_URL } = require('./tests/support/env');
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000, // mode `next dev` meng-compile halaman saat pertama dibuka, jadi dibuat longgar
  expect: { timeout: 10_000 },

  // Semua tes memakai database yang sama, jadi dijalankan berurutan agar tidak saling bentrok
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,

  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: BASE_URL,
    locale: 'id-ID',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  // Menjalankan `npm run dev` otomatis. Jika server sudah menyala, server itu dipakai ulang.
  // Jika BASE_URL diisi (mis. tes ke website yang sudah online), server lokal tidak dijalankan.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: BASE_URL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
