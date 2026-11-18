const { test, expect, setSesi, apiLogin } = require('./support/fixtures');

test.describe('Panel admin', () => {
  test.beforeEach(async ({ page, admin }) => {
    await setSesi(page, admin);
  });

  test('dashboard admin tampil', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.getByRole('heading', { name: 'Dashboard Admin' })).toBeVisible();
    await expect(page.getByText('JUMLAH PENGGUNA AKTIF')).toBeVisible();
    await expect(page.getByText('JUMLAH PROYEK')).toBeVisible();
  });

  test('menu sidebar admin bisa dibuka', async ({ page }) => {
    await page.goto('/admin');
    const sidebar = page.locator('[data-purpose="admin-sidebar"]');

    await sidebar.getByRole('link', { name: 'Verifikasi Akun' }).click();
    await expect(page).toHaveURL(/\/admin\/verifikasi$/);
    await expect(page.getByRole('heading', { name: 'Verifikasi Akun Mahasiswa' })).toBeVisible();

    await sidebar.getByRole('link', { name: /Kelola Kategori/ }).click();
    await expect(page).toHaveURL(/\/admin\/kategori$/);

    await sidebar.getByRole('link', { name: /Pantau Statistik/ }).click();
    await expect(page).toHaveURL(/\/admin\/statistik$/);
    await expect(page.getByRole('heading', { name: 'Statistik Penggunaan Platform' })).toBeVisible();

    await sidebar.getByRole('link', { name: 'Dashboard Admin' }).click();
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('admin memverifikasi akun mahasiswa -> akun itu jadi bisa login', async ({
    page,
    request,
    pendingUser,
  }) => {
    // Sebelum diverifikasi: login ditolak (403)
    expect((await apiLogin(request, pendingUser.email, pendingUser.password)).status).toBe(403);

    await page.goto('/admin/verifikasi');
    await page.getByPlaceholder('Cari nama, NIM, jurusan...').fill(pendingUser.nim);

    const baris = page.getByRole('row').filter({ hasText: pendingUser.nim });
    await expect(baris).toBeVisible();
    await baris.getByRole('button', { name: /Verifikasi/ }).click();

    await expect(page.getByRole('alert').filter({ hasText: 'berhasil diverifikasi' })).toBeVisible();

    // Sesudah diverifikasi: login berhasil (200)
    expect((await apiLogin(request, pendingUser.email, pendingUser.password)).status).toBe(200);
  });
});
