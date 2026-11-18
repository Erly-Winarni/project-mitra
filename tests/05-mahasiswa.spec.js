const { test, expect, setSesi, buatProyek, kodeUnik } = require('./support/fixtures');

const MENU_SIDEBAR = [
  { label: 'Dashboard', path: '/dashboard', url: /\/dashboard$/ },
  { label: 'Profil Saya', path: '/profil', url: /\/profil$/ },
  { label: 'Cari Proyek', path: '/proyek', url: /\/proyek$/ },
  { label: 'Proyek Saya', path: '/proyek-saya', url: /\/proyek-saya$/ },
  { label: 'Proyek Tergabung', path: '/proyek-tergabung', url: /\/proyek-tergabung$/ },
  { label: 'Chat', path: '/chat', url: /\/chat$/ },
  { label: 'Notifikasi', path: '/notifikasi', url: /\/notifikasi$/ },
];

test.describe('Area mahasiswa', () => {
  test.beforeEach(async ({ page, verifiedUser }) => {
    await setSesi(page, verifiedUser); // login cepat tanpa mengisi form
  });

  test('dashboard tampil setelah login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText(/Selamat datang kembali/)).toBeVisible();
    await expect(page.getByRole('complementary')).toBeVisible(); // sidebar
  });

  test('semua menu sidebar bisa dibuka', async ({ page }) => {
    await page.goto('/dashboard');
    const sidebar = page.getByRole('complementary');
    for (const item of MENU_SIDEBAR) {
      await sidebar.getByRole('link', { name: new RegExp(item.label) }).click();
      await expect(page).toHaveURL(item.url);
    }
  });

  test('pencarian proyek dari topbar menemukan proyek dan membuka detailnya', async ({
    page,
    request,
    verifiedUser,
  }) => {
    const proyek = await buatProyek(request, verifiedUser.token);

    await page.goto('/dashboard');
    const kotakCari = page.getByRole('searchbox', { name: 'Cari proyek' });
    await kotakCari.fill(proyek.judul);
    await kotakCari.press('Enter');

    await expect(page).toHaveURL(/\/proyek\?q=/);
    const kartu = page.getByRole('article').filter({ hasText: proyek.judul });
    await expect(kartu).toBeVisible();

    await kartu.getByRole('link', { name: 'Lihat Detail' }).click();
    await expect(page).toHaveURL(new RegExp(`/proyek/${proyek.proyek_id}$`));
    await expect(page.getByRole('heading', { name: proyek.judul }).first()).toBeVisible();
  });

  test('pencarian tanpa hasil menampilkan pesan kosong', async ({ page }) => {
    await page.goto(`/proyek?q=${encodeURIComponent('zzz-tidak-ada-' + kodeUnik())}`);
    await expect(page.getByText('Belum ada proyek yang cocok')).toBeVisible();
  });
});
