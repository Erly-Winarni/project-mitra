// Fitur: Notifikasi
const { test, expect, setSesi, buatProyek, lamarProyek, prosesLamaran, auth } = require('./support/fixtures');

async function daftarNotif(request, token, query = '') {
  const res = await request.get(`/api/notifikasi${query}`, { headers: auth(token) });
  expect(res.status()).toBe(200);
  return (await res.json()).data;
}

test.describe('Notifikasi (tampilan)', () => {
  test('akun baru belum punya notifikasi', async ({ page, verifiedUser }) => {
    await setSesi(page, verifiedUser);
    await page.goto('/notifikasi');
    await expect(page.getByRole('heading', { name: 'Notifikasi', level: 1 })).toBeVisible();
    await expect(page.getByText('Belum ada notifikasi')).toBeVisible();
  });

  test('pemilik menerima notifikasi saat ada pelamar baru', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await lamarProyek(request, pelamar.token, proyek.proyek_id);

    await setSesi(page, verifiedUser);
    await page.goto('/notifikasi');
    await expect(page.getByRole('link', { name: /Ada pelamar baru di proyek Anda/ })).toBeVisible();
    await expect(page.getByText(new RegExp(`mengajukan bergabung ke proyek "${proyek.judul}"`))).toBeVisible();
    await expect(page.getByTitle('Belum dibaca')).toBeVisible();
  });

  test('klik notifikasi menandainya dibaca dan membuka halaman terkait', async ({
    page, request, verifiedUser, mahasiswaBaru,
  }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await lamarProyek(request, pelamar.token, proyek.proyek_id);

    await setSesi(page, verifiedUser);
    await page.goto('/notifikasi');
    await page.getByRole('link', { name: /Ada pelamar baru di proyek Anda/ }).click();
    await expect(page).toHaveURL(/\/proyek-saya$/);

    // Status "dibaca" tersimpan di server
    await expect
      .poll(async () => (await daftarNotif(request, verifiedUser.token)).every((n) => n.is_read))
      .toBe(true);

    await page.goto('/notifikasi');
    await expect(page.getByRole('link', { name: /Ada pelamar baru/ })).toBeVisible();
    await expect(page.getByTitle('Belum dibaca')).toBeHidden();
  });

  test('pelamar menerima notifikasi saat lamarannya diterima', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    const lamaran = await lamarProyek(request, pelamar.token, proyek.proyek_id);
    await prosesLamaran(request, verifiedUser.token, lamaran.aplikasi_id, 'diterima');

    await setSesi(page, pelamar);
    await page.goto('/notifikasi');
    await expect(page.getByRole('link', { name: /Status lamaran Anda diperbarui/ })).toBeVisible();
    await expect(page.getByText(new RegExp(`proyek "${proyek.judul}" diterima`))).toBeVisible();
  });
});

test.describe('API notifikasi', () => {
  test('wajib login (401)', async ({ request }) => {
    expect((await request.get('/api/notifikasi')).status()).toBe(401);
  });

  test('filter unread dan tandai semua dibaca', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await lamarProyek(request, pelamar.token, proyek.proyek_id);

    expect((await daftarNotif(request, verifiedUser.token, '?unread=true')).length).toBeGreaterThan(0);

    const patch = await request.patch('/api/notifikasi', { headers: auth(verifiedUser.token) });
    expect(patch.status()).toBe(200);
    expect((await daftarNotif(request, verifiedUser.token, '?unread=true'))).toHaveLength(0);
  });

  test('menandai satu notifikasi; notifikasi milik orang lain -> 404', async ({ request, verifiedUser, mahasiswaBaru }) => {
    const pelamar = await mahasiswaBaru();
    const proyek = await buatProyek(request, verifiedUser.token);
    await lamarProyek(request, pelamar.token, proyek.proyek_id);
    const [notif] = await daftarNotif(request, verifiedUser.token);

    const orangLain = await request.patch(`/api/notifikasi/${notif.notifikasi_id}`, { headers: auth(pelamar.token) });
    expect(orangLain.status()).toBe(404);

    const milikSendiri = await request.patch(`/api/notifikasi/${notif.notifikasi_id}`, { headers: auth(verifiedUser.token) });
    expect(milikSendiri.status()).toBe(200);
    expect((await milikSendiri.json()).data.is_read).toBe(true);
  });
});
