// Fitur: filter pencarian proyek, rekomendasi proyek, rekomendasi mitra + ajakan kolaborasi
const { test, expect, setSesi, buatProyek, buatTag, kodeUnik, auth } = require('./support/fixtures');

test.describe('Filter pencarian proyek (tampilan)', () => {
  test('filter kategori + tombol Terapkan Filter memunculkan hanya kategori terpilih', async ({
    page, request, verifiedUser, mahasiswaBaru,
  }) => {
    const pencari = await mahasiswaBaru();
    const kode = kodeUnik();
    const lomba = await buatProyek(request, verifiedUser.token, { judul: `E2E ${kode} Lomba`, kategori: 'lomba' });
    const personal = await buatProyek(request, verifiedUser.token, { judul: `E2E ${kode} Personal`, kategori: 'personal' });

    await setSesi(page, pencari);
    await page.goto(`/proyek?q=${kode}`);
    await expect(page.getByRole('heading', { name: lomba.judul })).toBeVisible();
    await expect(page.getByRole('heading', { name: personal.judul })).toBeVisible();

    await page.locator('aside label').filter({ hasText: 'Lomba' }).click();
    await page.getByRole('button', { name: /Terapkan Filter/ }).click();

    await expect(page.getByRole('heading', { name: lomba.judul })).toBeVisible();
    await expect(page.getByRole('heading', { name: personal.judul })).toBeHidden();

    // Reset mengembalikan semua hasil
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByRole('heading', { name: personal.judul })).toBeVisible();
  });

  test('proyek yang ditutup tidak muncul di pencarian', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const pencari = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await request.put(`/api/proyek/${proyek.proyek_id}`, { headers: auth(verifiedUser.token), data: { status: 'ditutup' } });

    await setSesi(page, pencari);
    await page.goto(`/proyek?q=${encodeURIComponent(proyek.judul)}`);
    await expect(page.getByText('Belum ada proyek yang cocok')).toBeVisible();
  });
});

test.describe('Rekomendasi proyek & mitra', () => {
  // Skenario: pemilik membuat proyek dengan skill X, mahasiswa lain punya skill X di profilnya
  async function siapkan({ request, admin, verifiedUser, mahasiswaBaru, trackTag }) {
    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);
    const kandidat = await mahasiswaBaru();
    await request.put('/api/profil', { headers: auth(kandidat.token), data: { tags: [{ tag_id: tag.tag_id, level: 'mahir' }] } });
    const proyek = await buatProyek(request, verifiedUser.token, { tag_ids: [tag.tag_id] });
    return { tag, kandidat, proyek };
  }

  test('proyek dengan skill yang cocok direkomendasikan ke mahasiswa (API)', async ({
    request, admin, verifiedUser, mahasiswaBaru, trackTag,
  }) => {
    const { kandidat, proyek } = await siapkan({ request, admin, verifiedUser, mahasiswaBaru, trackTag });

    const res = await request.get('/api/rekomendasi/proyek', { headers: auth(kandidat.token) });
    expect(res.status()).toBe(200);
    expect((await res.json()).data.map((p) => p.proyek_id)).toContain(proyek.proyek_id);

    // Pemilik proyek tidak direkomendasikan proyeknya sendiri
    const milikSendiri = await request.get('/api/rekomendasi/proyek', { headers: auth(verifiedUser.token) });
    expect((await milikSendiri.json()).data.map((p) => p.proyek_id)).not.toContain(proyek.proyek_id);
  });

  test('halaman Cari Proyek menampilkan rekomendasi sesuai skill', async ({
    page, request, admin, verifiedUser, mahasiswaBaru, trackTag,
  }) => {
    const { kandidat, proyek } = await siapkan({ request, admin, verifiedUser, mahasiswaBaru, trackTag });
    await setSesi(page, kandidat);
    await page.goto('/proyek');
    await expect(page.getByRole('heading', { name: 'Rekomendasi Untuk Anda' })).toBeVisible();
    await expect(page.getByRole('heading', { name: proyek.judul })).toBeVisible();
  });

  test('mahasiswa dengan skill cocok menerima notifikasi saat proyek baru dibuat', async ({
    request, admin, verifiedUser, mahasiswaBaru, trackTag,
  }) => {
    const { kandidat, proyek } = await siapkan({ request, admin, verifiedUser, mahasiswaBaru, trackTag });
    const notif = (await (await request.get('/api/notifikasi', { headers: auth(kandidat.token) })).json()).data;
    expect(notif.some((n) => n.tipe === 'rekomendasi' && n.isi.includes(proyek.judul))).toBe(true);
  });

  test('rekomendasi mitra: hanya pemilik proyek yang boleh melihat (API)', async ({
    request, admin, verifiedUser, mahasiswaBaru, trackTag,
  }) => {
    const { kandidat, proyek } = await siapkan({ request, admin, verifiedUser, mahasiswaBaru, trackTag });

    const pemilik = await request.get(`/api/rekomendasi/mitra?proyek_id=${proyek.proyek_id}`, { headers: auth(verifiedUser.token) });
    expect(pemilik.status()).toBe(200);
    expect((await pemilik.json()).data.map((m) => m.pengguna_id)).toContain(kandidat.id);

    const bukanPemilik = await request.get(`/api/rekomendasi/mitra?proyek_id=${proyek.proyek_id}`, { headers: auth(kandidat.token) });
    expect(bukanPemilik.status()).toBe(403);
    expect((await request.get('/api/rekomendasi/mitra?proyek_id=999999999', { headers: auth(verifiedUser.token) })).status()).toBe(404);
  });

  test('pemilik mengajak calon mitra dari Proyek Saya -> pesan terkirim', async ({
    page, request, admin, verifiedUser, mahasiswaBaru, trackTag,
  }) => {
    const { kandidat, proyek } = await siapkan({ request, admin, verifiedUser, mahasiswaBaru, trackTag });

    await setSesi(page, verifiedUser);
    await page.goto('/proyek-saya');
    await expect(page.getByText('Rekomendasi Calon Mitra untuk Proyek Ini')).toBeVisible();
    await expect(page.getByText(kandidat.nama).first()).toBeVisible();

    await page.getByRole('button', { name: /Ajak Kolaborasi/ }).click();
    await expect(page.getByRole('button', { name: /Undangan Terkirim/ })).toBeDisabled();

    // Undangan sampai sebagai pesan chat ke kandidat
    const res = await request.get(`/api/pesan/${verifiedUser.id}`, { headers: auth(kandidat.token) });
    const pesan = (await res.json()).data;
    expect(pesan.some((m) => m.isi_pesan.includes(proyek.judul))).toBe(true);
  });

  test('tanpa kandidat cocok: panel menampilkan pesan belum ada rekomendasi', async ({ page, request, verifiedUser }) => {
    await buatProyek(request, verifiedUser.token); // tanpa tag
    await setSesi(page, verifiedUser);
    await page.goto('/proyek-saya');
    await expect(page.getByText('Belum ada rekomendasi untuk proyek ini')).toBeVisible();
  });
});
