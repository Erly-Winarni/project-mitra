// Fitur: Kelola Proyek Saya (tambah, edit, tutup/buka proyek) + detail & pencarian proyek
const { test, expect, setSesi, buatProyek, buatTag, kodeUnik, auth } = require('./support/fixtures');

function tanggalPlus(hari) {
  const d = new Date();
  d.setDate(d.getDate() + hari);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

async function proyekSaya(request, token) {
  const res = await request.get('/api/proyek?mine=true&status=all', { headers: auth(token) });
  expect(res.status()).toBe(200);
  return (await res.json()).data;
}

test.describe('Proyek Saya - tambah proyek', () => {
  test.beforeEach(async ({ page, verifiedUser }) => {
    await setSesi(page, verifiedUser);
    await page.goto('/proyek-saya');
    await expect(page.getByRole('heading', { name: 'Kelola Proyek Saya' })).toBeVisible();
  });

  test('tampilan awal: form tambah dan pesan belum ada proyek', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Buat Postingan Proyek Baru' })).toBeVisible();
    await expect(page.getByText('Belum ada postingan proyek')).toBeVisible();
    await expect(page.getByRole('button', { name: /Publikasikan Proyek/ })).toBeEnabled();
  });

  test('menambah proyek lengkap (judul, kategori, slot, deskripsi, deadline)', async ({ page, request, verifiedUser }) => {
    const judul = `E2E Proyek ${kodeUnik()}`;
    await page.locator('#judul-proyek').fill(judul);
    await page.locator('#kategori-proyek').selectOption('tugas_kuliah');
    await page.locator('#slot-anggota').fill('3 Anggota');
    await page.locator('#deskripsi-proyek').fill('Proyek ini dibuat oleh tes otomatis Playwright.');
    await page.locator('#deadline-proyek').fill(tanggalPlus(30));
    await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();

    // Kartu proyek muncul di daftar, form dikosongkan kembali
    await expect(page.getByRole('heading', { name: judul })).toBeVisible();
    await expect(page.getByText('0 dari 3 Anggota')).toBeVisible();
    await expect(page.getByText('Tanpa deadline')).toBeHidden();
    await expect(page.locator('#judul-proyek')).toHaveValue('');

    // Data benar-benar tersimpan di server
    const daftar = await proyekSaya(request, verifiedUser.token);
    const p = daftar.find((x) => x.judul === judul);
    expect(p).toBeTruthy();
    expect(p).toMatchObject({ kategori: 'tugas_kuliah', slot_dibutuhkan: 3, status: 'buka' });
  });

  test('menambah proyek hanya dengan judul (field lain default)', async ({ page, request, verifiedUser }) => {
    const judul = `E2E Minimal ${kodeUnik()}`;
    await page.locator('#judul-proyek').fill(judul);
    await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();

    await expect(page.getByRole('heading', { name: judul })).toBeVisible();
    await expect(page.getByText('Tanpa deadline')).toBeVisible();
    const p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.judul === judul);
    expect(p.slot_dibutuhkan).toBe(4); // default slot di form = 4 Anggota
  });

  test('judul kosong tidak bisa dikirim (validasi browser)', async ({ page, request, verifiedUser }) => {
    await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();
    const kosong = await page.locator('#judul-proyek').evaluate((el) => el.validity.valueMissing);
    expect(kosong).toBe(true);
    expect(await proyekSaya(request, verifiedUser.token)).toHaveLength(0);
  });

  test('batas slot: minimal 1 dan maksimal 50 anggota', async ({ page, request, verifiedUser }) => {
    const j1 = `E2E SlotMin ${kodeUnik()}`;
    await page.locator('#judul-proyek').fill(j1);
    await page.locator('#slot-anggota').fill('0 Anggota');
    await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();
    await expect(page.getByRole('heading', { name: j1 })).toBeVisible();

    const j2 = `E2E SlotMax ${kodeUnik()}`;
    await page.locator('#judul-proyek').fill(j2);
    await page.locator('#slot-anggota').fill('99 Anggota');
    await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();
    await expect(page.getByRole('heading', { name: j2 })).toBeVisible();

    const daftar = await proyekSaya(request, verifiedUser.token);
    expect(daftar.find((x) => x.judul === j1).slot_dibutuhkan).toBe(1);
    expect(daftar.find((x) => x.judul === j2).slot_dibutuhkan).toBe(50);
  });

  test('memilih skill dibutuhkan lewat picker lalu proyek menyimpan tag-nya', async ({
    page, request, admin, verifiedUser, trackTag,
  }) => {
    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);
    const judul = `E2E Tag ${kodeUnik()}`;

    await page.locator('#judul-proyek').fill(judul);
    await page.getByRole('button', { name: /Tambah Skill/ }).click();
    await page.getByPlaceholder('Cari skill...').fill(tag.nama_tag);
    await page.getByRole('button', { name: new RegExp(tag.nama_tag) }).click();

    // chip skill muncul di form, dan bisa dihapus
    const hapus = page.getByRole('button', { name: `Hapus skill ${tag.nama_tag}` });
    await expect(hapus).toBeVisible();

    await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();
    await expect(page.getByRole('heading', { name: judul })).toBeVisible();

    const p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.judul === judul);
    expect(p.tags.map((t) => t.nama_tag)).toContain(tag.nama_tag);
  });

});

test.describe('Proyek Saya - edit, tutup, buka', () => {
  let proyek;

  test.beforeEach(async ({ page, request, verifiedUser }) => {
    proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 2 });
    await setSesi(page, verifiedUser);
    await page.goto('/proyek-saya');
    await expect(page.getByRole('heading', { name: proyek.judul })).toBeVisible();
  });

  test('edit proyek mengubah judul dan slot', async ({ page, request, verifiedUser }) => {
    await page.getByRole('button', { name: /\bEdit\b/ }).click();
    await expect(page.getByRole('heading', { name: 'Edit Postingan Proyek' })).toBeVisible();
    await expect(page.locator('#judul-proyek')).toHaveValue(proyek.judul);

    const baru = `${proyek.judul} (revisi)`;
    await page.locator('#judul-proyek').fill(baru);
    await page.locator('#slot-anggota').fill('5 Anggota');
    await page.getByRole('button', { name: /Simpan Perubahan/ }).click();

    await expect(page.getByRole('heading', { name: baru })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Buat Postingan Proyek Baru' })).toBeVisible();

    const p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.proyek_id === proyek.proyek_id);
    expect(p).toMatchObject({ judul: baru, slot_dibutuhkan: 5 });
  });

  test('tombol Batal membatalkan mode edit', async ({ page }) => {
    await page.getByRole('button', { name: /\bEdit\b/ }).click();
    await expect(page.getByRole('heading', { name: 'Edit Postingan Proyek' })).toBeVisible();
    await page.getByRole('button', { name: 'Batal' }).click();
    await expect(page.getByRole('heading', { name: 'Buat Postingan Proyek Baru' })).toBeVisible();
  });

  test('menutup postingan lalu membukanya kembali', async ({ page, request, verifiedUser }) => {
    // Playwright menolak dialog confirm() secara default, jadi harus diterima manual
    page.once('dialog', (d) => d.accept());
    await page.getByRole('button', { name: /Tutup Postingan/ }).click();
    await expect(page.getByText('Ditutup', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Buka Kembali/ })).toBeVisible();

    let p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.proyek_id === proyek.proyek_id);
    expect(p.status).toBe('ditutup');

    page.once('dialog', (d) => d.accept());
    await page.getByRole('button', { name: /Buka Kembali/ }).click();
    await expect(page.getByText('Buka', { exact: true })).toBeVisible();
    p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.proyek_id === proyek.proyek_id);
    expect(p.status).toBe('buka');
  });

  test('membatalkan dialog konfirmasi tidak menutup proyek', async ({ page, request, verifiedUser }) => {
    page.once('dialog', (d) => d.dismiss());
    await page.getByRole('button', { name: /Tutup Postingan/ }).click();
    await expect(page.getByRole('button', { name: /Tutup Postingan/ })).toBeVisible();
    const p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.proyek_id === proyek.proyek_id);
    expect(p.status).toBe('buka');
  });
});

test.describe('API Proyek', () => {
  test('pemilik dapat mengubah proyek; non-pemilik ditolak (403)', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const proyek = await buatProyek(request, verifiedUser.token);
    const orangLain = await mahasiswaBaru();

    const ok = await request.put(`/api/proyek/${proyek.proyek_id}`, {
      headers: auth(verifiedUser.token), data: { judul: 'Judul Baru E2E' },
    });
    expect(ok.status()).toBe(200);
    expect((await ok.json()).data.judul).toBe('Judul Baru E2E');

    const tolak = await request.put(`/api/proyek/${proyek.proyek_id}`, {
      headers: auth(orangLain.token), data: { judul: 'Dibajak' },
    });
    expect(tolak.status()).toBe(403);
  });

  test('pemilik dapat menghapus proyek; non-pemilik ditolak; setelah dihapus 404', async ({
    request, verifiedUser, mahasiswaBaru,
  }) => {
    const proyek = await buatProyek(request, verifiedUser.token);
    const orangLain = await mahasiswaBaru();

    expect((await request.delete(`/api/proyek/${proyek.proyek_id}`, { headers: auth(orangLain.token) })).status()).toBe(403);
    expect((await request.delete(`/api/proyek/${proyek.proyek_id}`, { headers: auth(verifiedUser.token) })).status()).toBe(200);
    expect((await request.get(`/api/proyek/${proyek.proyek_id}`, { headers: auth(verifiedUser.token) })).status()).toBe(404);
  });

  test('admin boleh menghapus proyek milik mahasiswa', async ({ request, admin, verifiedUser }) => {
    const proyek = await buatProyek(request, verifiedUser.token);
    expect((await request.delete(`/api/proyek/${proyek.proyek_id}`, { headers: auth(admin.token) })).status()).toBe(200);
  });

  test('detail proyek memuat info pemilik dan flag is_pemilik', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const proyek = await buatProyek(request, verifiedUser.token);
    const orangLain = await mahasiswaBaru();

    const sebagaiPemilik = (await (await request.get(`/api/proyek/${proyek.proyek_id}`, { headers: auth(verifiedUser.token) })).json()).data;
    const sebagaiLain = (await (await request.get(`/api/proyek/${proyek.proyek_id}`, { headers: auth(orangLain.token) })).json()).data;
    expect(sebagaiPemilik.is_pemilik).toBe(true);
    expect(sebagaiLain.is_pemilik).toBe(false);
    expect(sebagaiPemilik.pemilik_nama).toBe(verifiedUser.nama);
  });

  test('validasi: judul > 150 karakter dan slot < 1 ditolak (400)', async ({ request, verifiedUser }) => {
    const panjang = await request.post('/api/proyek', {
      headers: auth(verifiedUser.token), data: { judul: 'A'.repeat(151) },
    });
    expect(panjang.status()).toBe(400);
    const slot = await request.post('/api/proyek', {
      headers: auth(verifiedUser.token), data: { judul: 'Slot nol', slot_dibutuhkan: 0 },
    });
    expect(slot.status()).toBe(400);
  });

  test('validasi: format deadline harus YYYY-MM-DD', async ({ request, verifiedUser }) => {
    const res = await request.post('/api/proyek', {
      headers: auth(verifiedUser.token), data: { judul: 'Deadline salah', deadline: '31/12/2030' },
    });
    expect(res.status()).toBe(400);
  });

  test('judul 150 karakter (batas atas) masih diterima', async ({ request, verifiedUser }) => {
    const res = await request.post('/api/proyek', {
      headers: auth(verifiedUser.token), data: { judul: 'B'.repeat(150) },
    });
    expect(res.status()).toBe(201);
  });

  test('filter daftar proyek: kategori, mine, dan status', async ({ request, verifiedUser }) => {
    const kode = kodeUnik();
    const lomba = await buatProyek(request, verifiedUser.token, { judul: `E2E ${kode} lomba`, kategori: 'lomba' });
    await buatProyek(request, verifiedUser.token, { judul: `E2E ${kode} personal`, kategori: 'personal' });

    const res = await request.get(`/api/proyek?q=${kode}&kategori=lomba`, { headers: auth(verifiedUser.token) });
    const data = (await res.json()).data;
    expect(data.map((p) => p.proyek_id)).toEqual([lomba.proyek_id]);

    const mine = await request.get('/api/proyek?mine=true', { headers: auth(verifiedUser.token) });
    expect((await mine.json()).data.length).toBe(2);
  });
});
