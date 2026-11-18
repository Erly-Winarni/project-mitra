const { test, expect, dataUserBaru } = require('./support/fixtures');

async function isiForm(page, d) {
  await page.locator('#nim').fill(d.nim);
  await page.locator('#nama').fill(d.nama);
  await page.locator('#email').fill(d.email);
  await page.locator('#password').fill(d.password);
}

test.describe('Registrasi', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('menampilkan form registrasi', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Buat Akun Baru' })).toBeVisible();
    for (const id of ['#nim', '#nama', '#email', '#password']) {
      await expect(page.locator(id)).toBeVisible();
    }
    await expect(page.getByRole('button', { name: 'Daftar' })).toBeEnabled();
  });

  test('form kosong menampilkan pesan validasi', async ({ page }) => {
    await page.getByRole('button', { name: 'Daftar' }).click();
    await expect(page.getByText('NIM wajib diisi')).toBeVisible();
    await expect(page.getByText('Nama lengkap wajib diisi')).toBeVisible();
    await expect(page.getByText('Email wajib diisi')).toBeVisible();
    await expect(page.getByText('Password wajib diisi')).toBeVisible();
  });

  test('format email tidak valid ditolak', async ({ page }) => {
    await isiForm(page, { ...dataUserBaru(), email: 'bukan-email' });
    await page.getByRole('button', { name: 'Daftar' }).click();
    await expect(page.getByText('Format email tidak valid')).toBeVisible();
  });

  test('password kurang dari 8 karakter ditolak', async ({ page }) => {
    await isiForm(page, { ...dataUserBaru(), password: '1234567' });
    await page.getByRole('button', { name: 'Daftar' }).click();
    await expect(page.getByText('Password minimal 8 karakter')).toBeVisible();
  });

  test('NIM lebih dari 20 karakter ditolak', async ({ page }) => {
    await isiForm(page, { ...dataUserBaru(), nim: 'A'.repeat(21) });
    await page.getByRole('button', { name: 'Daftar' }).click();
    await expect(page.getByText('NIM maksimal 20 karakter')).toBeVisible();
  });

  test('pesan error hilang saat field diperbaiki', async ({ page }) => {
    await page.getByRole('button', { name: 'Daftar' }).click();
    await expect(page.getByText('NIM wajib diisi')).toBeVisible();
    await page.locator('#nim').fill('H071240001');
    await expect(page.getByText('NIM wajib diisi')).toBeHidden();
  });

  test('tombol mata menampilkan dan menyembunyikan password', async ({ page }) => {
    await page.locator('#password').fill('rahasia123');
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
    await page.getByRole('button', { name: 'Tampilkan password' }).click();
    await expect(page.locator('#password')).toHaveAttribute('type', 'text');
    await page.getByRole('button', { name: 'Sembunyikan password' }).click();
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  });

  test('registrasi berhasil menampilkan info menunggu verifikasi', async ({ page, trackUser }) => {
    const d = dataUserBaru();
    trackUser(d.email);
    await isiForm(page, d);
    await page.getByRole('button', { name: 'Daftar' }).click();

    await expect(page.getByRole('heading', { name: 'Pendaftaran Berhasil' })).toBeVisible();
    await expect(page.getByText(/diverifikasi oleh admin/).first()).toBeVisible();

    await page.getByRole('link', { name: /Ke Halaman Login/ }).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test('NIM yang sudah terdaftar ditolak', async ({ page, verifiedUser }) => {
    await isiForm(page, { ...dataUserBaru(), nim: verifiedUser.nim });
    await page.getByRole('button', { name: 'Daftar' }).click();
    await expect(page.getByText('NIM sudah terdaftar')).toBeVisible();
  });

  test('email yang sudah terdaftar ditolak', async ({ page, verifiedUser }) => {
    await isiForm(page, { ...dataUserBaru(), email: verifiedUser.email });
    await page.getByRole('button', { name: 'Daftar' }).click();
    await expect(page.getByText('Email sudah terdaftar')).toBeVisible();
  });

  test('link "Sudah punya akun" membuka halaman login', async ({ page }) => {
    await page.getByRole('link', { name: /Sudah punya akun/ }).click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
