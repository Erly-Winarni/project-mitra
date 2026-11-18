// Menguji proteksi halaman (guard): siapa boleh membuka halaman apa.
const { test, expect, setSesi } = require('./support/fixtures');

const HALAMAN_MAHASISWA = [
  '/dashboard',
  '/profil',
  '/proyek',
  '/proyek-saya',
  '/proyek-tergabung',
  '/chat',
  '/notifikasi',
];
const HALAMAN_ADMIN = ['/admin', '/admin/verifikasi', '/admin/kategori', '/admin/statistik'];

test.describe('Proteksi halaman', () => {
  for (const path of [...HALAMAN_MAHASISWA, ...HALAMAN_ADMIN]) {
    test(`tanpa login, ${path} dialihkan ke /login`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/login$/);
    });
  }

  test('token rusak/kedaluwarsa -> dialihkan ke /login dan sesi dibersihkan', async ({ page }) => {
    await setSesi(page, { token: 'token.palsu.123', user: { role: 'mahasiswa' } });
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login$/);
    const token = await page.evaluate(() => localStorage.getItem('skillmatch_token'));
    expect(token).toBeNull();
  });

  test('mahasiswa tidak bisa membuka halaman admin', async ({ page, verifiedUser }) => {
    await setSesi(page, verifiedUser);
    await page.goto('/admin');
    await expect(page).not.toHaveURL(/\/admin/);
  });

  test('admin yang membuka halaman mahasiswa dialihkan ke /admin', async ({ page, admin }) => {
    await setSesi(page, admin);
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/admin$/);
  });
});
