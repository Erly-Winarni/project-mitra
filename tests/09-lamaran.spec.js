// Fitur: alur kolaborasi lintas pengguna (melamar -> pemilik menerima/menolak -> status & notifikasi)
const {
  test, expect, setSesi, buatProyek, lamarProyek, prosesLamaran, auth,
} = require('./support/fixtures');

async function daftarNotif(request, token) {
  const res = await request.get('/api/notifikasi', { headers: auth(token) });
  expect(res.status()).toBe(200);
  return (await res.json()).data;
}

test.describe('Melamar proyek (tampilan)', () => {
  test('mahasiswa melamar proyek lewat halaman detail', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);

    await setSesi(page, pelamar);
    await page.goto(`/proyek/${proyek.proyek_id}`);
    await expect(page.getByRole('heading', { name: proyek.judul }).first()).toBeVisible();

    await page.locator('#apply-message').fill('Saya bisa mengerjakan bagian frontend.');
    await page.getByRole('button', { name: /Ajukan Diri Bergabung/ }).click();

    await expect(page.getByRole('button', { name: /Lamaran Terkirim/ })).toBeDisabled();
    await expect(page.getByText('Menunggu Keputusan Pemilik Proyek')).toBeVisible();

    const res = await request.get('/api/aplikasi', { headers: auth(pelamar.token) });
    const lamaran = (await res.json()).data.find((a) => a.proyek_id === proyek.proyek_id);
    expect(lamaran).toMatchObject({ status: 'pending', pesan: 'Saya bisa mengerjakan bagian frontend.' });
  });

  test('melamar tanpa pesan (opsional) tetap berhasil', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await setSesi(page, pelamar);
    await page.goto(`/proyek/${proyek.proyek_id}`);
    await page.getByRole('button', { name: /Ajukan Diri Bergabung/ }).click();
    await expect(page.getByRole('button', { name: /Lamaran Terkirim/ })).toBeDisabled();
  });

  test('pemilik tidak bisa melamar proyek sendiri', async ({ page, request, verifiedUser }) => {
    const proyek = await buatProyek(request, verifiedUser.token);
    await setSesi(page, verifiedUser);
    await page.goto(`/proyek/${proyek.proyek_id}`);
    await expect(page.getByRole('button', { name: /Ini Proyek Kamu/ })).toBeDisabled();
  });

  test('yang sudah melamar tidak bisa melamar lagi', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await lamarProyek(request, pelamar.token, proyek.proyek_id);

    await setSesi(page, pelamar);
    await page.goto(`/proyek/${proyek.proyek_id}`);
    await expect(page.getByRole('button', { name: /Lamaran Terkirim/ })).toBeDisabled();
    await expect(page.locator('#apply-message')).toBeDisabled();
  });

  test('proyek yang sudah ditutup tidak bisa dilamar', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await request.put(`/api/proyek/${proyek.proyek_id}`, { headers: auth(verifiedUser.token), data: { status: 'ditutup' } });

    await setSesi(page, pelamar);
    await page.goto(`/proyek/${proyek.proyek_id}`);
    await expect(page.getByRole('button', { name: /Proyek Ditutup/ })).toBeDisabled();
  });

  test('proyek yang tidak ada menampilkan halaman "tidak ditemukan"', async ({ page, verifiedUser }) => {
    await setSesi(page, verifiedUser);
    await page.goto('/proyek/999999999');
    await expect(page.getByRole('heading', { name: 'Proyek tidak ditemukan' })).toBeVisible();
    await page.getByRole('link', { name: /Kembali ke Pencarian/ }).click();
    await expect(page).toHaveURL(/\/proyek$/);
  });
});

test.describe('Pemilik memproses pelamar (tampilan)', () => {
  test('batal pada dialog konfirmasi tidak menolak pelamar', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await lamarProyek(request, pelamar.token, proyek.proyek_id);

    await setSesi(page, verifiedUser);
    await page.goto('/proyek-saya');
    page.once('dialog', (d) => d.dismiss());
    await page.getByRole('button', { name: 'Tolak', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Terima', exact: true })).toBeVisible();
  });

  test('menerima pelamar terakhir mengisi slot dan menutup proyek otomatis', async ({
    page, request, verifiedUser, mahasiswaBaru,
  }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 1 });
    await lamarProyek(request, pelamar.token, proyek.proyek_id);

    await setSesi(page, verifiedUser);
    await page.goto('/proyek-saya');
    await page.getByRole('button', { name: 'Terima', exact: true }).click();
    await expect(page.getByText('Ditutup', { exact: true })).toBeVisible();

    const detail = await request.get(`/api/proyek/${proyek.proyek_id}`, { headers: auth(verifiedUser.token) });
    expect((await detail.json()).data.status).toBe('ditutup');
  });
});

test.describe('Proyek Tergabung (tampilan)', () => {
  test('pelamar melihat lamarannya di tab Semua Lamaran', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await lamarProyek(request, pelamar.token, proyek.proyek_id, 'Pesan lamaran uji');

    await setSesi(page, pelamar);
    await page.goto('/proyek-tergabung');
    await page.getByRole('button', { name: /Semua Lamaran/ }).click();
    await expect(page.getByRole('link', { name: proyek.judul })).toBeVisible();
    await expect(page.getByText('Menunggu Respon').first()).toBeVisible();
    await expect(page.getByText('Pesan lamaran uji')).toBeVisible();
  });

  test('pelamar yang diterima melihat proyek di tab Semua Tergabung sebagai Anggota Tim', async ({
    page, request, verifiedUser, mahasiswaBaru,
  }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 3 });
    const lamaran = await lamarProyek(request, pelamar.token, proyek.proyek_id);
    expect((await prosesLamaran(request, verifiedUser.token, lamaran.aplikasi_id, 'diterima')).status()).toBe(200);

    await setSesi(page, pelamar);
    await page.goto('/proyek-tergabung');
    await expect(page.getByRole('link', { name: proyek.judul })).toBeVisible();
    await expect(page.getByText('Anggota Tim').first()).toBeVisible();
    await expect(page.getByText('Chat Ketua')).toBeVisible();
  });

  test('pemilik melihat proyeknya di Proyek Tergabung sebagai Ketua Tim', async ({ page, request, verifiedUser }) => {
    const proyek = await buatProyek(request, verifiedUser.token);
    await setSesi(page, verifiedUser);
    await page.goto('/proyek-tergabung');
    await expect(page.getByRole('link', { name: proyek.judul })).toBeVisible();
    await expect(page.getByText('Ketua Tim (Pemilik)')).toBeVisible();
  });

  test('pencarian lokal memfilter daftar dan menampilkan pesan kosong', async ({ page, request, verifiedUser }) => {
    const proyek = await buatProyek(request, verifiedUser.token);
    await setSesi(page, verifiedUser);
    await page.goto('/proyek-tergabung');
    const kotak = page.getByPlaceholder('Cari dalam daftar...');

    await kotak.fill(proyek.judul);
    await expect(page.getByRole('link', { name: proyek.judul })).toBeVisible();

    await kotak.fill('zzz-tidak-ada-zzz');
    await expect(page.getByText(/Tidak ada proyek yang sesuai dengan/)).toBeVisible();
  });

  test('akun baru: pesan belum bergabung di proyek mana pun', async ({ page, verifiedUser }) => {
    await setSesi(page, verifiedUser);
    await page.goto('/proyek-tergabung');
    await expect(page.getByText('Belum Bergabung di Proyek Mana Pun')).toBeVisible();
  });
});

test.describe('API lamaran', () => {
  test('melamar dua kali ke proyek yang sama -> 409', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await lamarProyek(request, pelamar.token, proyek.proyek_id);
    const lagi = await request.post(`/api/proyek/${proyek.proyek_id}/aplikasi`, { headers: auth(pelamar.token), data: {} });
    expect(lagi.status()).toBe(409);
  });

  test('melamar proyek sendiri -> 400', async ({ request, verifiedUser }) => {
    const proyek = await buatProyek(request, verifiedUser.token);
    const res = await request.post(`/api/proyek/${proyek.proyek_id}/aplikasi`, { headers: auth(verifiedUser.token), data: {} });
    expect(res.status()).toBe(400);
  });

  test('melamar proyek tertutup -> 409, proyek tidak ada -> 404', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await request.put(`/api/proyek/${proyek.proyek_id}`, { headers: auth(verifiedUser.token), data: { status: 'ditutup' } });

    const tutup = await request.post(`/api/proyek/${proyek.proyek_id}/aplikasi`, { headers: auth(pelamar.token), data: {} });
    expect(tutup.status()).toBe(409);
    const hilang = await request.post('/api/proyek/999999999/aplikasi', { headers: auth(pelamar.token), data: {} });
    expect(hilang.status()).toBe(404);
  });

  test('pesan lamaran lebih dari 2000 karakter ditolak (400)', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    const res = await request.post(`/api/proyek/${proyek.proyek_id}/aplikasi`, {
      headers: auth(pelamar.token), data: { pesan: 'x'.repeat(2001) },
    });
    expect(res.status()).toBe(400);
  });

  test('hanya pemilik yang boleh memproses lamaran dan melihat daftar pelamar (403)', async ({
    request, verifiedUser, mahasiswaBaru,
  }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    const lamaran = await lamarProyek(request, pelamar.token, proyek.proyek_id);

    const proses = await prosesLamaran(request, pelamar.token, lamaran.aplikasi_id, 'diterima'); // pelamar mencoba menerima dirinya sendiri
    expect(proses.status()).toBe(403);
    const daftar = await request.get(`/api/proyek/${proyek.proyek_id}/aplikasi`, { headers: auth(pelamar.token) });
    expect(daftar.status()).toBe(403);
  });

  test('pemilik dapat melihat dan memfilter pelamar berdasarkan status', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const a = await mahasiswaBaru();
    const b = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 3 });
    const la = await lamarProyek(request, a.token, proyek.proyek_id);
    await lamarProyek(request, b.token, proyek.proyek_id);
    await prosesLamaran(request, verifiedUser.token, la.aplikasi_id, 'diterima');

    const semua = await (await request.get(`/api/proyek/${proyek.proyek_id}/aplikasi`, { headers: auth(verifiedUser.token) })).json();
    expect(semua.data).toHaveLength(2);
    const pending = await (await request.get(`/api/proyek/${proyek.proyek_id}/aplikasi?status=pending`, { headers: auth(verifiedUser.token) })).json();
    expect(pending.data).toHaveLength(1);
    expect(pending.data[0].pengguna_id).toBe(b.id);
  });

  test('status lamaran tidak valid -> 400; lamaran yang sudah diproses -> 409', async ({
    request, verifiedUser, mahasiswaBaru,
  }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    const lamaran = await lamarProyek(request, pelamar.token, proyek.proyek_id);

    expect((await prosesLamaran(request, verifiedUser.token, lamaran.aplikasi_id, 'pending')).status()).toBe(400);
    expect((await prosesLamaran(request, verifiedUser.token, lamaran.aplikasi_id, 'diterima')).status()).toBe(200);
    expect((await prosesLamaran(request, verifiedUser.token, lamaran.aplikasi_id, 'ditolak')).status()).toBe(409);
    expect((await prosesLamaran(request, verifiedUser.token, 999999999, 'diterima')).status()).toBe(404);
  });

  test('slot penuh: menerima pelamar melebihi kuota ditolak (409)', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const a = await mahasiswaBaru();
    const b = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 1 });
    const la = await lamarProyek(request, a.token, proyek.proyek_id);
    const lb = await lamarProyek(request, b.token, proyek.proyek_id);

    expect((await prosesLamaran(request, verifiedUser.token, la.aplikasi_id, 'diterima')).status()).toBe(200);
    expect((await prosesLamaran(request, verifiedUser.token, lb.aplikasi_id, 'diterima')).status()).toBe(409);
  });

  test('detail proyek menampilkan anggota diterima dan lamaran_saya', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 2 });
    const lamaran = await lamarProyek(request, pelamar.token, proyek.proyek_id);
    await prosesLamaran(request, verifiedUser.token, lamaran.aplikasi_id, 'diterima');

    const detail = (await (await request.get(`/api/proyek/${proyek.proyek_id}`, { headers: auth(pelamar.token) })).json()).data;
    expect(detail.anggota.map((m) => m.pengguna_id)).toContain(pelamar.id);
    expect(detail.lamaran_saya.status).toBe('diterima');
    expect(detail.slot_terisi).toBe(1);
  });

  test('pelamar dapat membatalkan lamaran pending; setelah diproses tidak bisa', async ({
    request, verifiedUser, mahasiswaBaru,
  }) => {
    const a = await mahasiswaBaru();
    const b = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 3 });
    const la = await lamarProyek(request, a.token, proyek.proyek_id);
    const lb = await lamarProyek(request, b.token, proyek.proyek_id);

    expect((await request.delete(`/api/aplikasi/${la.aplikasi_id}`, { headers: auth(b.token) })).status()).toBe(404); // bukan lamaran miliknya
    expect((await request.delete(`/api/aplikasi/${la.aplikasi_id}`, { headers: auth(a.token) })).status()).toBe(200);
    expect((await request.delete(`/api/aplikasi/${la.aplikasi_id}`, { headers: auth(a.token) })).status()).toBe(404); // sudah dihapus

    await prosesLamaran(request, verifiedUser.token, lb.aplikasi_id, 'diterima');
    expect((await request.delete(`/api/aplikasi/${lb.aplikasi_id}`, { headers: auth(b.token) })).status()).toBe(404); // sudah diproses
  });

  test('notifikasi terkirim: pemilik saat ada pelamar, pelamar saat lamaran diproses', async ({
    request, verifiedUser, mahasiswaBaru,
  }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    const lamaran = await lamarProyek(request, pelamar.token, proyek.proyek_id);

    const notifPemilik = await daftarNotif(request, verifiedUser.token);
    expect(notifPemilik.some((n) => n.tipe === 'pelamar' && n.isi.includes(proyek.judul))).toBe(true);

    await prosesLamaran(request, verifiedUser.token, lamaran.aplikasi_id, 'diterima');
    const notifPelamar = await daftarNotif(request, pelamar.token);
    expect(notifPelamar.some((n) => n.tipe === 'status_lamaran' && n.isi.includes('diterima'))).toBe(true);
  });
});
