// Fitur admin: Kelola Kategori Skill/Minat + Statistik + Hapus pengguna
const { test, expect, setSesi, buatTag, kodeUnik, auth } = require('./support/fixtures');

// Baris item kategori: elemen terdalam yang memuat nama tag dan tombol "Ubah"
function barisKategori(page, nama) {
  return page
    .locator('div')
    .filter({ hasText: nama })
    .filter({ has: page.getByRole('button', { name: /Ubah/ }) })
    .last();
}

test.describe('Kelola Kategori (tampilan)', () => {
  test.beforeEach(async ({ page, admin }) => {
    await setSesi(page, admin);
    await page.goto('/admin/kategori');
    await expect(page.getByRole('heading', { name: 'Kelola Kategori Skill/Minat' })).toBeVisible();
  });

  test('menampilkan panel Skill dan Minat', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Kategori Skill' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kategori Minat' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Tambah Skill/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Tambah Minat/ })).toBeVisible();
  });

  test('menambah kategori skill baru', async ({ page, trackTag }) => {
    const nama = `E2E Skill ${kodeUnik()}`;
    trackTag(nama);
    await page.getByRole('button', { name: /Tambah Skill/ }).click();
    await expect(page.getByRole('heading', { name: 'Tambah Kategori Skill' })).toBeVisible();

    await page.locator('#nama_tag').fill(nama);
    await page.locator('#kategori').fill('Pengujian');
    await page.getByRole('button', { name: /Simpan$/ }).click();

    await expect(page.getByRole('alert').filter({ hasText: `Kategori "${nama}" berhasil ditambahkan!` })).toBeVisible();
    await expect(page.getByText(nama, { exact: true })).toBeVisible();
  });

  test('menambah kategori minat baru', async ({ page, trackTag }) => {
    const nama = `E2E Minat ${kodeUnik()}`;
    trackTag(nama);
    await page.getByRole('button', { name: /Tambah Minat/ }).click();
    await expect(page.getByRole('heading', { name: 'Tambah Kategori Minat' })).toBeVisible();
    await page.locator('#nama_tag').fill(nama);
    await page.getByRole('button', { name: /Simpan$/ }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'berhasil ditambahkan' })).toBeVisible();
    await expect(page.getByText(nama, { exact: true })).toBeVisible();
  });

  test('nama kategori kosong ditolak', async ({ page }) => {
    await page.getByRole('button', { name: /Tambah Skill/ }).click();
    await page.getByRole('button', { name: /Simpan$/ }).click();
    await expect(page.getByText('Nama kategori wajib diisi')).toBeVisible();
  });

  test('nama kategori yang sudah ada ditolak', async ({ page, request, admin, trackTag }) => {
    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);
    await page.reload();
    await page.getByRole('button', { name: /Tambah Skill/ }).click();
    await page.locator('#nama_tag').fill(tag.nama_tag);
    await page.getByRole('button', { name: /Simpan$/ }).click();
    await expect(page.getByText('Nama kategori sudah ada')).toBeVisible();
  });

  test('tombol Batal menutup form tanpa menyimpan', async ({ page }) => {
    await page.getByRole('button', { name: /Tambah Skill/ }).click();
    await expect(page.getByRole('heading', { name: 'Tambah Kategori Skill' })).toBeVisible();
    await page.getByRole('button', { name: 'Batal' }).click();
    await expect(page.getByRole('heading', { name: 'Tambah Kategori Skill' })).toBeHidden();
  });

  test('mengubah nama kategori', async ({ page, request, admin, trackTag }) => {
    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);
    const namaBaru = `${tag.nama_tag} v2`;
    trackTag(namaBaru);
    await page.reload();

    await barisKategori(page, tag.nama_tag).getByRole('button', { name: /Ubah/ }).click();
    await expect(page.getByRole('heading', { name: 'Ubah Kategori Skill' })).toBeVisible();
    await expect(page.locator('#nama_tag')).toHaveValue(tag.nama_tag);
    await page.locator('#nama_tag').fill(namaBaru);
    await page.getByRole('button', { name: /Perbarui$/ }).click();

    await expect(page.getByRole('alert').filter({ hasText: 'berhasil diperbarui' })).toBeVisible();
    await expect(page.getByText(namaBaru, { exact: true })).toBeVisible();
  });

  test('menghapus kategori dengan dialog konfirmasi', async ({ page, request, admin, trackTag }) => {
    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);
    await page.reload();

    await barisKategori(page, tag.nama_tag).getByRole('button', { name: /Hapus/ }).click();
    await expect(page.getByRole('heading', { name: 'Hapus Kategori' })).toBeVisible();
    await page.getByRole('button', { name: /Hapus$/ }).last().click(); // tombol konfirmasi ada di dialog (paling akhir di DOM)

    await expect(page.getByRole('alert').filter({ hasText: 'berhasil dihapus' })).toBeVisible();
    await expect(page.getByText(tag.nama_tag, { exact: true })).toBeHidden();
  });

  test('batal pada dialog hapus tidak menghapus kategori', async ({ page, request, admin, trackTag }) => {
    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);
    await page.reload();
    await barisKategori(page, tag.nama_tag).getByRole('button', { name: /Hapus/ }).click();
    await page.getByRole('button', { name: 'Batal' }).click();
    await expect(page.getByText(tag.nama_tag, { exact: true })).toBeVisible();
  });

  test('pencarian di panel Skill memfilter daftar', async ({ page, request, admin, trackTag }) => {
    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);
    await page.reload();
    const cari = page.getByPlaceholder('Cari nama skill atau kategori...');

    await cari.fill(tag.nama_tag);
    await expect(page.getByText(tag.nama_tag, { exact: true })).toBeVisible();

    await cari.fill('zzz-tidak-ada-zzz');
    await expect(page.getByText(/Tidak ditemukan skill dengan kata kunci/)).toBeVisible();
  });
});

test.describe('API tag/kategori', () => {
  test('daftar tag dapat dibaca tanpa login dan difilter', async ({ request, admin, trackTag }) => {
    const minat = await buatTag(request, admin, { jenis: 'minat' });
    trackTag(minat.nama_tag);

    const semua = await request.get(`/api/tag?q=${encodeURIComponent(minat.nama_tag)}`);
    expect(semua.status()).toBe(200);
    expect((await semua.json()).data).toHaveLength(1);

    const hanyaSkill = await request.get(`/api/tag?jenis=skill&q=${encodeURIComponent(minat.nama_tag)}`);
    expect((await hanyaSkill.json()).data).toHaveLength(0);
  });

  test('hanya admin yang boleh membuat, mengubah, dan menghapus tag', async ({ request, admin, verifiedUser, trackTag }) => {
    const data = { nama_tag: `E2E Tag ${kodeUnik()}`, jenis: 'skill' };
    trackTag(data.nama_tag);

    expect((await request.post('/api/tag', { data })).status()).toBe(401);
    expect((await request.post('/api/tag', { headers: auth(verifiedUser.token), data })).status()).toBe(403);

    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);
    expect((await request.put(`/api/tag/${tag.tag_id}`, { headers: auth(verifiedUser.token), data: { nama_tag: 'x' } })).status()).toBe(403);
    expect((await request.delete(`/api/tag/${tag.tag_id}`, { headers: auth(verifiedUser.token) })).status()).toBe(403);
  });

  test('validasi tag: jenis tidak valid, nama kosong, nama terlalu panjang, nama duplikat', async ({ request, admin, trackTag }) => {
    const h = { headers: auth(admin.token) };
    expect((await request.post('/api/tag', { ...h, data: { nama_tag: 'X', jenis: 'lainnya' } })).status()).toBe(400);
    expect((await request.post('/api/tag', { ...h, data: { nama_tag: '', jenis: 'skill' } })).status()).toBe(400);
    expect((await request.post('/api/tag', { ...h, data: { nama_tag: 'T'.repeat(101), jenis: 'skill' } })).status()).toBe(400);

    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);
    expect((await request.post('/api/tag', { ...h, data: { nama_tag: tag.nama_tag, jenis: 'skill' } })).status()).toBe(409);
  });

  test('admin mengubah dan menghapus tag; tag yang tidak ada -> 404', async ({ request, admin, trackTag }) => {
    const tag = await buatTag(request, admin);
    trackTag(tag.nama_tag);
    const h = { headers: auth(admin.token) };

    const ubah = await request.put(`/api/tag/${tag.tag_id}`, { ...h, data: { kategori: 'Diubah' } });
    expect(ubah.status()).toBe(200);
    expect((await ubah.json()).data.kategori).toBe('Diubah');

    expect((await request.delete(`/api/tag/${tag.tag_id}`, h)).status()).toBe(200);
    expect((await request.delete(`/api/tag/${tag.tag_id}`, h)).status()).toBe(404);
    expect((await request.put('/api/tag/999999999', { ...h, data: { nama_tag: 'x' } })).status()).toBe(404);
  });

  test('menghapus tag melepasnya dari profil mahasiswa', async ({ request, admin, verifiedUser }) => {
    const tag = await buatTag(request, admin);
    await request.put('/api/profil', { headers: auth(verifiedUser.token), data: { tags: [{ tag_id: tag.tag_id }] } });
    await request.delete(`/api/tag/${tag.tag_id}`, { headers: auth(admin.token) });

    const profil = (await (await request.get('/api/profil', { headers: auth(verifiedUser.token) })).json()).data;
    expect(profil.tags.some((t) => t.tag_id === tag.tag_id)).toBe(false);
  });
});

test.describe('API statistik & manajemen pengguna (admin)', () => {
  test('statistik memuat ringkasan platform', async ({ request, admin }) => {
    const res = await request.get('/api/admin/statistik', { headers: auth(admin.token) });
    expect(res.status()).toBe(200);
    const d = (await res.json()).data;
    for (const k of ['total_mahasiswa', 'terverifikasi', 'menunggu_verifikasi', 'proyek_per_status', 'lamaran_per_status', 'total_pesan', 'tag_terpopuler']) {
      expect(d, `field ${k} harus ada`).toHaveProperty(k);
    }
    expect(d.total_mahasiswa).toBeGreaterThanOrEqual(d.terverifikasi);
  });

  test('daftar pengguna admin dapat difilter status verifikasi dan dicari', async ({ request, admin, pendingUser, verifiedUser }) => {
    const h = { headers: auth(admin.token) };
    const menunggu = (await (await request.get(`/api/admin/pengguna?is_verified=false&q=${encodeURIComponent(pendingUser.nim)}`, h)).json()).data;
    expect(menunggu.map((u) => u.nim)).toEqual([pendingUser.nim]);

    const sudah = (await (await request.get(`/api/admin/pengguna?is_verified=true&q=${encodeURIComponent(verifiedUser.nim)}`, h)).json()).data;
    expect(sudah.map((u) => u.nim)).toEqual([verifiedUser.nim]);
    expect(sudah[0].password_hash).toBeUndefined();
  });

  test('admin mencabut verifikasi -> akun tidak bisa login lagi', async ({ request, admin, verifiedUser }) => {
    const cabut = await request.patch(`/api/admin/pengguna/${verifiedUser.id}`, { headers: auth(admin.token), data: { is_verified: false } });
    expect(cabut.status()).toBe(200);
    const login = await request.post('/api/auth/login', { data: { identifier: verifiedUser.email, password: verifiedUser.password } });
    expect(login.status()).toBe(403);
  });

  test('admin menghapus pengguna -> tidak bisa login (akun hilang)', async ({ request, admin, pendingUser }) => {
    const hapus = await request.delete(`/api/admin/pengguna/${pendingUser.id}`, { headers: auth(admin.token) });
    expect(hapus.status()).toBe(200);
    const login = await request.post('/api/auth/login', { data: { identifier: pendingUser.email, password: pendingUser.password } });
    expect(login.status()).toBe(401);
  });
});

test.describe('Statistik (tampilan)', () => {
  test('halaman statistik memuat kartu ringkasan tanpa error', async ({ page, admin }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await setSesi(page, admin);
    await page.goto('/admin/statistik');
    await expect(page.getByRole('heading', { name: 'Statistik Penggunaan Platform' })).toBeVisible();
    expect(errors, `Error JS: ${errors.join(' | ')}`).toEqual([]);
  });
});
