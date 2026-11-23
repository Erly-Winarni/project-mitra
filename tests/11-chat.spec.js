// Fitur: Chat / pesan antar mahasiswa
const { test, expect, setSesi, kodeUnik, auth } = require('./support/fixtures');

async function kirimApi(request, token, penerimaId, isi) {
  const res = await request.post('/api/pesan', { headers: auth(token), data: { penerima_id: penerimaId, isi_pesan: isi } });
  expect(res.status(), 'Kirim pesan via API harus 201').toBe(201);
  return (await res.json()).data;
}

async function riwayat(request, token, lawanId, query = '') {
  const res = await request.get(`/api/pesan/${lawanId}${query}`, { headers: auth(token) });
  expect(res.status()).toBe(200);
  return (await res.json()).data;
}

test.describe('Chat (tampilan)', () => {
  test('akun baru belum punya percakapan', async ({ page, verifiedUser }) => {
    await setSesi(page, verifiedUser);
    await page.goto('/chat');
    await expect(page.getByText('Belum ada percakapan', { exact: true })).toBeVisible();
    await expect(page.locator('#message-input')).toHaveCount(0);
  });

  test('mengirim pesan ke mahasiswa lain lewat tombol Kirim', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const lawan = await mahasiswaBaru();
    const isi = `Halo dari Playwright ${kodeUnik()}`;

    await setSesi(page, verifiedUser);
    await page.goto(`/chat?user=${lawan.id}`);
    await expect(page.getByRole('heading', { name: lawan.nama })).toBeVisible();

    const input = page.locator('#message-input');
    await expect(input).toBeEnabled();
    await input.fill(isi);
    await page.getByRole('button', { name: /Kirim/ }).click();

    await expect(page.locator('#message-container').getByText(isi)).toBeVisible();
    await expect(page.getByText('Terkirim').first()).toBeVisible();
    await expect(input).toHaveValue('');

    // Pesan sampai di sisi penerima
    const pesan = await riwayat(request, lawan.token, verifiedUser.id);
    expect(pesan.map((m) => m.isi_pesan)).toContain(isi);
  });

  test('menekan Enter juga mengirim pesan', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const lawan = await mahasiswaBaru();
    const isi = `Pesan via Enter ${kodeUnik()}`;
    await setSesi(page, verifiedUser);
    await page.goto(`/chat?user=${lawan.id}`);
    const input = page.locator('#message-input');
    await expect(input).toBeEnabled();
    await input.fill(isi);
    await input.press('Enter');
    await expect(page.locator('#message-container').getByText(isi)).toBeVisible();
    expect((await riwayat(request, lawan.token, verifiedUser.id)).map((m) => m.isi_pesan)).toContain(isi);
  });

  test('tombol Kirim nonaktif untuk pesan kosong atau hanya spasi', async ({ page, verifiedUser, mahasiswaBaru }) => {
    const lawan = await mahasiswaBaru();
    await setSesi(page, verifiedUser);
    await page.goto(`/chat?user=${lawan.id}`);
    const input = page.locator('#message-input');
    await expect(input).toBeEnabled();
    const kirim = page.getByRole('button', { name: /Kirim/ });
    await expect(kirim).toBeDisabled();
    await input.fill('     ');
    await expect(kirim).toBeDisabled();
    await input.fill('ada isi');
    await expect(kirim).toBeEnabled();
  });

  test('pesan lebih dari 2000 karakter ditolak dengan pesan error', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const lawan = await mahasiswaBaru();
    await setSesi(page, verifiedUser);
    await page.goto(`/chat?user=${lawan.id}`);
    const input = page.locator('#message-input');
    await expect(input).toBeEnabled();
    await input.fill('x'.repeat(2001));
    await page.getByRole('button', { name: /Kirim/ }).click();
    await expect(page.getByText('Pesan terlalu panjang (maksimal 2000 karakter)')).toBeVisible();
    expect(await riwayat(request, lawan.token, verifiedUser.id)).toHaveLength(0);
  });

  test('penerima melihat pesan masuk lalu membalas', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const pengirim = await mahasiswaBaru();
    const masuk = `Pesan masuk ${kodeUnik()}`;
    const balasan = `Balasan ${kodeUnik()}`;
    await kirimApi(request, pengirim.token, verifiedUser.id, masuk);

    await setSesi(page, verifiedUser);
    await page.goto('/chat');
    await expect(page.getByRole('heading', { name: pengirim.nama })).toBeVisible(); // percakapan pertama otomatis terbuka
    await expect(page.locator('#message-container').getByText(masuk)).toBeVisible();

    const input = page.locator('#message-input');
    await expect(input).toBeEnabled();
    await input.fill(balasan);
    await page.getByRole('button', { name: /Kirim/ }).click();
    await expect(page.locator('#message-container').getByText(balasan)).toBeVisible();

    const dariSisiPengirim = await riwayat(request, pengirim.token, verifiedUser.id);
    expect(dariSisiPengirim.map((m) => m.isi_pesan)).toEqual([masuk, balasan]);
  });

  test('pencarian percakapan memfilter daftar', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const lawan = await mahasiswaBaru();
    await kirimApi(request, verifiedUser.token, lawan.id, 'sekedar tes pencarian');

    await setSesi(page, verifiedUser);
    await page.goto('/chat');
    const cari = page.locator('#chat-search');

    await cari.fill('zzz-tidak-ada');
    await expect(page.getByText('Tidak ditemukan percakapan dengan "zzz-tidak-ada"')).toBeVisible();

    await cari.fill(lawan.nama);
    await expect(page.getByText('Tidak ditemukan percakapan')).toBeHidden();
  });
});

test.describe('API pesan', () => {
  test('wajib login (401)', async ({ request }) => {
    expect((await request.get('/api/pesan')).status()).toBe(401);
    expect((await request.post('/api/pesan', { data: { penerima_id: 1, isi_pesan: 'x' } })).status()).toBe(401);
  });

  test('validasi: ke diri sendiri 400, penerima tidak ada 404, isi kosong/terlalu panjang 400', async ({ request, verifiedUser }) => {
    const h = { headers: auth(verifiedUser.token) };
    expect((await request.post('/api/pesan', { ...h, data: { penerima_id: verifiedUser.id, isi_pesan: 'x' } })).status()).toBe(400);
    expect((await request.post('/api/pesan', { ...h, data: { penerima_id: 999999999, isi_pesan: 'x' } })).status()).toBe(404);
    expect((await request.post('/api/pesan', { ...h, data: { penerima_id: 1, isi_pesan: '' } })).status()).toBe(400);
    expect((await request.post('/api/pesan', { ...h, data: { penerima_id: 1, isi_pesan: 'x'.repeat(5001) } })).status()).toBe(400);
  });

  test('daftar percakapan menghitung belum_dibaca, lalu 0 setelah riwayat dibuka', async ({
    request, verifiedUser, mahasiswaBaru,
  }) => {
    const lawan = await mahasiswaBaru();
    await kirimApi(request, lawan.token, verifiedUser.id, 'satu');
    await kirimApi(request, lawan.token, verifiedUser.id, 'dua');

    const sebelum = (await (await request.get('/api/pesan', { headers: auth(verifiedUser.token) })).json()).data;
    expect(sebelum.find((c) => c.lawan_id === lawan.id).belum_dibaca).toBe(2);

    const pesan = await riwayat(request, verifiedUser.token, lawan.id);
    expect(pesan.map((m) => m.isi_pesan)).toEqual(['satu', 'dua']); // urut dari yang terlama

    const sesudah = (await (await request.get('/api/pesan', { headers: auth(verifiedUser.token) })).json()).data;
    expect(sesudah.find((c) => c.lawan_id === lawan.id).belum_dibaca).toBe(0);
  });

  test('riwayat hanya berisi percakapan dua pihak (privasi)', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const b = await mahasiswaBaru();
    const c = await mahasiswaBaru();
    await kirimApi(request, verifiedUser.token, b.id, 'rahasia untuk B');

    expect(await riwayat(request, verifiedUser.token, c.id)).toHaveLength(0); // A-C kosong
    expect(await riwayat(request, c.token, verifiedUser.id)).toHaveLength(0); // C tidak bisa membaca pesan A-B
  });

  test('parameter limit membatasi jumlah pesan yang dikembalikan', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const lawan = await mahasiswaBaru();
    await kirimApi(request, verifiedUser.token, lawan.id, 'pertama');
    await kirimApi(request, verifiedUser.token, lawan.id, 'kedua');
    const terbaru = await riwayat(request, verifiedUser.token, lawan.id, '?limit=1');
    expect(terbaru.map((m) => m.isi_pesan)).toEqual(['kedua']);
  });

  test('penerima mendapat notifikasi "Pesan baru dari ..."', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const lawan = await mahasiswaBaru();
    await kirimApi(request, verifiedUser.token, lawan.id, 'cek notifikasi');
    const res = await request.get('/api/notifikasi', { headers: auth(lawan.token) });
    const notif = (await res.json()).data;
    expect(notif.some((n) => n.tipe === 'pesan' && n.isi.includes(verifiedUser.nama))).toBe(true);
  });
});
