// Fitur: Profil mahasiswa (data dasar, privasi, skill/minat, ganti password) + pencarian mitra
const { test, expect, setSesi, buatTag, apiLogin, auth } = require('./support/fixtures');

const TAHUN_INI = new Date().getFullYear();

test.describe('Profil Saya (tampilan)', () => {
  test.beforeEach(async ({ page, verifiedUser }) => {
    await setSesi(page, verifiedUser);
    await page.goto('/profil');
    await expect(page.locator('#input-nama-lengkap')).toHaveValue(verifiedUser.nama); // tunggu data termuat
  });

  test('menampilkan data akun; NIM tidak bisa diubah', async ({ page, verifiedUser }) => {
    await expect(page.getByRole('heading', { name: 'Profil Saya' })).toBeVisible();
    await expect(page.locator('#input-nim')).toHaveValue(verifiedUser.nim);
    await expect(page.locator('#input-nim')).not.toBeEditable();
  });

  test('menyimpan perubahan profil lalu datanya tetap ada setelah reload', async ({ page, request, verifiedUser }) => {
    await page.locator('#input-nama-lengkap').fill('Nama Baru E2E');
    await page.locator('#input-jurusan').fill('Teknik Informatika');
    await page.locator('#input-angkatan').fill('2022');
    await page.locator('#input-ketersediaan').fill('10 jam/minggu');
    await page.getByRole('button', { name: /Simpan Profil/ }).click();
    await expect(page.locator('#toast-text')).toHaveText('Profil berhasil disimpan!');

    const res = await request.get('/api/profil', { headers: auth(verifiedUser.token) });
    expect((await res.json()).data).toMatchObject({
      nama: 'Nama Baru E2E', jurusan: 'Teknik Informatika', angkatan: 2022, ketersediaan_waktu: '10 jam/minggu',
    });

    await page.reload();
    await expect(page.locator('#input-nama-lengkap')).toHaveValue('Nama Baru E2E');
    await expect(page.locator('#input-jurusan')).toHaveValue('Teknik Informatika');
    await expect(page.locator('#input-angkatan')).toHaveValue('2022');
  });

  test('nama kosong ditolak dengan pesan validasi', async ({ page }) => {
    await page.locator('#input-nama-lengkap').fill('');
    await page.getByRole('button', { name: /Simpan Profil/ }).click();
    await expect(page.getByText('Nama lengkap wajib diisi')).toBeVisible();
    await expect(page.locator('#toast-text')).toHaveText('Mohon periksa kembali isian formulir.');
  });

  test('pesan error hilang saat field diperbaiki', async ({ page }) => {
    await page.locator('#input-nama-lengkap').fill('');
    await page.getByRole('button', { name: /Simpan Profil/ }).click();
    await expect(page.getByText('Nama lengkap wajib diisi')).toBeVisible();
    await page.locator('#input-nama-lengkap').fill('A');
    await expect(page.getByText('Nama lengkap wajib diisi')).toBeHidden();
  });

  test('nama lebih dari 100 karakter ditolak (batas atas)', async ({ page }) => {
    await page.locator('#input-nama-lengkap').fill('N'.repeat(101));
    await page.getByRole('button', { name: /Simpan Profil/ }).click();
    await expect(page.getByText('Nama maksimal 100 karakter')).toBeVisible();
  });

  test('angkatan di luar rentang 2000 s.d. tahun ini ditolak', async ({ page }) => {
    await page.locator('#input-angkatan').fill('1999');
    await page.getByRole('button', { name: /Simpan Profil/ }).click();
    await expect(page.getByText(/Angkatan harus 4 digit antara 2000 dan \d{4}/)).toBeVisible();

    await page.locator('#input-angkatan').fill(String(TAHUN_INI + 5));
    await page.getByRole('button', { name: /Simpan Profil/ }).click();
    await expect(page.getByText(/Angkatan harus 4 digit antara 2000 dan \d{4}/)).toBeVisible();
  });

  test('angkatan 2000 (batas bawah) diterima', async ({ page }) => {
    await page.locator('#input-angkatan').fill('2000');
    await page.getByRole('button', { name: /Simpan Profil/ }).click();
    await expect(page.locator('#toast-text')).toHaveText('Profil berhasil disimpan!');
  });

});

test.describe('API profil, privasi, dan mitra', () => {
  test('menyimpan skill ke profil lengkap dengan level, dan menggantinya', async ({
    request, admin, verifiedUser, trackTag,
  }) => {
    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);

    const set = await request.put('/api/profil', {
      headers: auth(verifiedUser.token), data: { tags: [{ tag_id: tag.tag_id, level: 'mahir' }] },
    });
    expect(set.status()).toBe(200);
    const tags = (await set.json()).data.tags;
    expect(tags.find((t) => t.tag_id === tag.tag_id)).toMatchObject({ level: 'mahir' });

    const kosong = await request.put('/api/profil', { headers: auth(verifiedUser.token), data: { tags: [] } });
    expect((await kosong.json()).data.tags).toHaveLength(0);
  });

  test('validasi profil: level tidak valid, angkatan 1999, nama kosong -> 400', async ({ request, verifiedUser }) => {
    const h = { headers: auth(verifiedUser.token) };
    expect((await request.put('/api/profil', { ...h, data: { tags: [{ tag_id: 1, level: 'dewa' }] } })).status()).toBe(400);
    expect((await request.put('/api/profil', { ...h, data: { angkatan: 1999 } })).status()).toBe(400);
    expect((await request.put('/api/profil', { ...h, data: { nama: '' } })).status()).toBe(400);
  });

  test('profil privat: orang lain 403, pemilik dan admin 200; profil publik menyembunyikan email & NIM', async ({
    request, admin, verifiedUser, mahasiswaBaru,
  }) => {
    const lain = await mahasiswaBaru();
    await request.put('/api/profil', { headers: auth(verifiedUser.token), data: { profil_publik: false } });

    expect((await request.get(`/api/pengguna/${verifiedUser.id}`, { headers: auth(lain.token) })).status()).toBe(403);
    expect((await request.get(`/api/pengguna/${verifiedUser.id}`, { headers: auth(verifiedUser.token) })).status()).toBe(200);
    expect((await request.get(`/api/pengguna/${verifiedUser.id}`, { headers: auth(admin.token) })).status()).toBe(200);

    await request.put('/api/profil', { headers: auth(verifiedUser.token), data: { profil_publik: true } });
    const publik = await request.get(`/api/pengguna/${verifiedUser.id}`, { headers: auth(lain.token) });
    expect(publik.status()).toBe(200);
    const data = (await publik.json()).data;
    expect(data.email).toBeUndefined();
    expect(data.nim).toBeUndefined();
  });

  test('pengguna yang tidak ada -> 404', async ({ request, verifiedUser }) => {
    expect((await request.get('/api/pengguna/999999999', { headers: auth(verifiedUser.token) })).status()).toBe(404);
  });

  test('pencarian mitra: hanya profil publik, tidak memuat diri sendiri', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const publik = await mahasiswaBaru();
    const privat = await mahasiswaBaru();
    await request.put('/api/profil', { headers: auth(privat.token), data: { profil_publik: false } });

    const cari = async (nama) => {
      const res = await request.get(`/api/mitra?q=${encodeURIComponent(nama)}`, { headers: auth(verifiedUser.token) });
      expect(res.status()).toBe(200);
      return (await res.json()).data.map((m) => m.pengguna_id);
    };
    expect(await cari(publik.nama)).toContain(publik.id);
    expect(await cari(privat.nama)).not.toContain(privat.id);
    expect(await cari(verifiedUser.nama)).not.toContain(verifiedUser.id);
  });

  test('ganti password: validasi, password lama salah, lalu berhasil', async ({ request, verifiedUser }) => {
    const h = { headers: auth(verifiedUser.token) };
    expect((await request.put('/api/auth/password', { ...h, data: { password_lama: 'salah-lama', password_baru: 'PasswordBaru123' } })).status()).toBe(400);
    expect((await request.put('/api/auth/password', { ...h, data: { password_lama: verifiedUser.password, password_baru: 'pendek' } })).status()).toBe(400);

    const ok = await request.put('/api/auth/password', { ...h, data: { password_lama: verifiedUser.password, password_baru: 'PasswordBaru123' } });
    expect(ok.status()).toBe(200);

    expect((await apiLogin(request, verifiedUser.email, 'PasswordBaru123')).status).toBe(200);
    expect((await apiLogin(request, verifiedUser.email, verifiedUser.password)).status).toBe(401);
  });
});
