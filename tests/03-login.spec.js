const { test, expect } = require('./support/fixtures');

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('menampilkan form login', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login untuk Melanjutkan' })).toBeVisible();
    await expect(page.locator('#identifier')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Masuk' })).toBeEnabled();
  });

  test('mahasiswa terverifikasi login dengan EMAIL -> dashboard', async ({ page, verifiedUser }) => {
    await page.locator('#identifier').fill(verifiedUser.email);
    await page.locator('#password').fill(verifiedUser.password);
    await page.getByRole('button', { name: 'Masuk' }).click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByText(/Selamat datang kembali/)).toBeVisible();

    const token = await page.evaluate(() => localStorage.getItem('skillmatch_token'));
    expect(token).toBeTruthy();
  });

  test('mahasiswa terverifikasi login dengan NIM -> dashboard', async ({ page, verifiedUser }) => {
    await page.locator('#identifier').fill(verifiedUser.nim);
    await page.locator('#password').fill(verifiedUser.password);
    await page.getByRole('button', { name: 'Masuk' }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
  });

  test('admin login -> dashboard admin', async ({ page, admin }) => {
    await page.locator('#identifier').fill(admin.identifier);
    await page.locator('#password').fill(admin.password);
    await page.getByRole('button', { name: 'Masuk' }).click();
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole('heading', { name: 'Dashboard Admin' })).toBeVisible();
  });

  test('tombol mata menampilkan password', async ({ page }) => {
    await page.locator('#password').fill('rahasia123');
    await page.getByRole('button', { name: 'Lihat password' }).click();
    await expect(page.locator('#password')).toHaveAttribute('type', 'text');
    await page.getByRole('button', { name: 'Sembunyikan password' }).click();
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  });

  test('tombol berubah jadi "Memproses..." dan nonaktif saat loading', async ({ page, verifiedUser }) => {
    // Respons API sengaja ditahan 1,5 detik agar kondisi loading terlihat
    await page.route('**/api/auth/login', async (route) => {
      await new Promise((r) => setTimeout(r, 1500));
      await route.continue();
    });
    await page.locator('#identifier').fill(verifiedUser.email);
    await page.locator('#password').fill(verifiedUser.password);
    await page.getByRole('button', { name: 'Masuk' }).click();

    const tombol = page.getByRole('button', { name: 'Memproses...' });
    await expect(tombol).toBeVisible();
    await expect(tombol).toBeDisabled();
    await expect(page).toHaveURL(/\/dashboard$/);
  });

  test('link ke registrasi dan kembali ke beranda berfungsi', async ({ page }) => {
    await page.getByRole('link', { name: /Belum punya akun/ }).click();
    await expect(page).toHaveURL(/\/register$/);
    await page.goBack();
    await page.getByRole('link', { name: /Kembali ke Beranda/ }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
