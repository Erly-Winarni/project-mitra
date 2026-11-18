const { test, expect } = require('./support/fixtures');

test.describe('Landing page', () => {
  test('beranda tampil dengan judul dan hero', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SkillMatch/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Temukan Mitra Proyek');
    await expect(page.getByRole('link', { name: /Mulai Sekarang/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Pelajari Fitur/ })).toBeVisible();
  });

  test('navbar: pindah ke halaman Fitur dan Tentang', async ({ page }) => {
    await page.goto('/');
    const navbar = page.getByRole('banner');

    await navbar.getByRole('link', { name: 'Fitur' }).click();
    await expect(page).toHaveURL(/\/fitur$/);

    await navbar.getByRole('link', { name: 'Tentang' }).click();
    await expect(page).toHaveURL(/\/tentang$/);

    await navbar.getByRole('link', { name: 'Beranda' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('tombol Login dan Daftar mengarah ke halaman yang benar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('banner').getByRole('link', { name: 'Login', exact: true }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: 'Login untuk Melanjutkan' })).toBeVisible();

    await page.goto('/');
    await page.getByRole('banner').getByRole('link', { name: 'Daftar', exact: true }).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(page.getByRole('heading', { name: 'Buat Akun Baru' })).toBeVisible();
  });

  test('CTA "Mulai Sekarang" membuka halaman registrasi', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Mulai Sekarang/ }).first().click();
    await expect(page).toHaveURL(/\/register$/);
  });

  test('halaman yang tidak ada mengembalikan 404', async ({ page }) => {
    const res = await page.goto('/halaman-yang-tidak-ada');
    expect(res.status()).toBe(404);
  });

  test.describe('tampilan mobile', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('menu hamburger membuka navigasi', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Menu navigasi' }).click();
      await page.getByRole('banner').getByRole('link', { name: 'Fitur' }).click();
      await expect(page).toHaveURL(/\/fitur$/);
    });
  });
});
