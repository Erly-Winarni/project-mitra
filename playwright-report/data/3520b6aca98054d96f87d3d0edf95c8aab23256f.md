# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 12-profil.spec.js >> Profil Saya (tampilan) >> toggle visibilitas: profil bisa dibuat privat
- Location: tests\12-profil.spec.js:81:3

# Error details

```
Error: expect(locator).toBeChecked() failed

Locator: locator('#toggle-visibilitas')
Expected: checked
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeChecked" locator('#toggle-visibilitas') with timeout 10000ms
  - waiting for locator('#toggle-visibilitas')

```

```yaml
- alert
- complementary:
  - text: hub SkillMatch Campus Hub
  - navigation:
    - link "dashboard Dashboard":
      - /url: /dashboard
    - link "person Profil Saya":
      - /url: /profil
    - link "explore Cari Proyek":
      - /url: /proyek
    - link "folder Proyek Saya":
      - /url: /proyek-saya
    - link "groups Proyek Tergabung":
      - /url: /proyek-tergabung
    - link "chat_bubble Chat":
      - /url: /chat
    - link "notifications Notifikasi":
      - /url: /notifikasi
  - button "logout Keluar"
- banner:
  - text: Universitas Hasanuddin
  - search:
    - text: search
    - searchbox "Cari proyek"
  - link "notifications":
    - /url: /notifikasi
  - link "Profil saya":
    - /url: /profil
    - text: TM
- main:
  - text: Akun Mahasiswa • Preferensi Kolaborasi
  - heading "Profil Saya" [level=1]
  - paragraph: Kelola data akademik, keahlian, dan portofolio untuk meningkatkan kecocokan kolaborasi proyek kampus.
  - text: school
  - heading "Data Dasar" [level=2]
  - paragraph: Informasi identitas akademik dan alokasi waktu kamu.
  - text: account_circle Foto Profil
  - paragraph: Format JPG, PNG atau WebP (Maks. 2MB)
  - text: photo_camera Unggah Foto Nama Lengkap
  - textbox "Nama Lengkap":
    - /placeholder: "Contoh: Ahmad Fauzi"
    - text: Tester mwtbjafltsjc
  - text: NIM
  - textbox "NIM":
    - /placeholder: "Contoh: 22010182"
    - text: E2EMWTBJAFLTSJC
  - text: Jurusan
  - textbox "Jurusan":
    - /placeholder: "Contoh: Teknik Informatika"
  - text: Angkatan
  - spinbutton "Angkatan"
  - text: Ketersediaan Waktu schedule
  - textbox "Ketersediaan Waktu":
    - /placeholder: 10 - 15 jam/minggu, Fleksibel di akhir pekan
  - text: auto_awesome
  - heading "Skill & Minat" [level=2]
  - paragraph: Tentukan kompetensi teknis dan topik proyek yang ingin kamu eksplorasi.
  - text: Skill 0 Terpilih
  - button "add Tambah Skill"
  - text: Minat Bidang Proyek 0 Terpilih
  - button "add Tambah Minat"
  - button "save Simpan Profil"
  - text: check
```

# Test source

```ts
  1   | // Fitur: Profil mahasiswa (data dasar, privasi, skill/minat, ganti password) + pencarian mitra
  2   | const { test, expect, setSesi, buatTag, apiLogin, auth } = require('./support/fixtures');
  3   | 
  4   | const TAHUN_INI = new Date().getFullYear();
  5   | 
  6   | test.describe('Profil Saya (tampilan)', () => {
  7   |   test.beforeEach(async ({ page, verifiedUser }) => {
  8   |     await setSesi(page, verifiedUser);
  9   |     await page.goto('/profil');
  10  |     await expect(page.locator('#input-nama-lengkap')).toHaveValue(verifiedUser.nama); // tunggu data termuat
  11  |   });
  12  | 
  13  |   test('menampilkan data akun; NIM tidak bisa diubah', async ({ page, verifiedUser }) => {
  14  |     await expect(page.getByRole('heading', { name: 'Profil Saya' })).toBeVisible();
  15  |     await expect(page.locator('#input-nim')).toHaveValue(verifiedUser.nim);
  16  |     await expect(page.locator('#input-nim')).not.toBeEditable();
  17  |   });
  18  | 
  19  |   test('menyimpan perubahan profil lalu datanya tetap ada setelah reload', async ({ page, request, verifiedUser }) => {
  20  |     await page.locator('#input-nama-lengkap').fill('Nama Baru E2E');
  21  |     await page.locator('#input-jurusan').fill('Teknik Informatika');
  22  |     await page.locator('#input-angkatan').fill('2022');
  23  |     await page.locator('#input-ketersediaan').fill('10 jam/minggu');
  24  |     await page.getByRole('button', { name: /Simpan Profil/ }).click();
  25  |     await expect(page.locator('#toast-text')).toHaveText('Profil berhasil disimpan!');
  26  | 
  27  |     const res = await request.get('/api/profil', { headers: auth(verifiedUser.token) });
  28  |     expect((await res.json()).data).toMatchObject({
  29  |       nama: 'Nama Baru E2E', jurusan: 'Teknik Informatika', angkatan: 2022, ketersediaan_waktu: '10 jam/minggu',
  30  |     });
  31  | 
  32  |     await page.reload();
  33  |     await expect(page.locator('#input-nama-lengkap')).toHaveValue('Nama Baru E2E');
  34  |     await expect(page.locator('#input-jurusan')).toHaveValue('Teknik Informatika');
  35  |     await expect(page.locator('#input-angkatan')).toHaveValue('2022');
  36  |   });
  37  | 
  38  |   test('nama kosong ditolak dengan pesan validasi', async ({ page }) => {
  39  |     await page.locator('#input-nama-lengkap').fill('');
  40  |     await page.getByRole('button', { name: /Simpan Profil/ }).click();
  41  |     await expect(page.getByText('Nama lengkap wajib diisi')).toBeVisible();
  42  |     await expect(page.locator('#toast-text')).toHaveText('Mohon periksa kembali isian formulir.');
  43  |   });
  44  | 
  45  |   test('pesan error hilang saat field diperbaiki', async ({ page }) => {
  46  |     await page.locator('#input-nama-lengkap').fill('');
  47  |     await page.getByRole('button', { name: /Simpan Profil/ }).click();
  48  |     await expect(page.getByText('Nama lengkap wajib diisi')).toBeVisible();
  49  |     await page.locator('#input-nama-lengkap').fill('A');
  50  |     await expect(page.getByText('Nama lengkap wajib diisi')).toBeHidden();
  51  |   });
  52  | 
  53  |   test('nama lebih dari 100 karakter ditolak (batas atas)', async ({ page }) => {
  54  |     await page.locator('#input-nama-lengkap').fill('N'.repeat(101));
  55  |     await page.getByRole('button', { name: /Simpan Profil/ }).click();
  56  |     await expect(page.getByText('Nama maksimal 100 karakter')).toBeVisible();
  57  |   });
  58  | 
  59  |   test('angkatan di luar rentang 2000 s.d. tahun ini ditolak', async ({ page }) => {
  60  |     await page.locator('#input-angkatan').fill('1999');
  61  |     await page.getByRole('button', { name: /Simpan Profil/ }).click();
  62  |     await expect(page.getByText(/Angkatan harus 4 digit antara 2000 dan \d{4}/)).toBeVisible();
  63  | 
  64  |     await page.locator('#input-angkatan').fill(String(TAHUN_INI + 5));
  65  |     await page.getByRole('button', { name: /Simpan Profil/ }).click();
  66  |     await expect(page.getByText(/Angkatan harus 4 digit antara 2000 dan \d{4}/)).toBeVisible();
  67  |   });
  68  | 
  69  |   test('angkatan 2000 (batas bawah) diterima', async ({ page }) => {
  70  |     await page.locator('#input-angkatan').fill('2000');
  71  |     await page.getByRole('button', { name: /Simpan Profil/ }).click();
  72  |     await expect(page.locator('#toast-text')).toHaveText('Profil berhasil disimpan!');
  73  |   });
  74  | 
  75  |   test('ketersediaan waktu lebih dari 100 karakter ditolak', async ({ page }) => {
  76  |     await page.locator('#input-ketersediaan').fill('k'.repeat(101));
  77  |     await page.getByRole('button', { name: /Simpan Profil/ }).click();
  78  |     await expect(page.getByText('Ketersediaan waktu maksimal 100 karakter')).toBeVisible();
  79  |   });
  80  | 
  81  |   test('toggle visibilitas: profil bisa dibuat privat', async ({ page, request, verifiedUser }) => {
> 82  |     await expect(page.locator('#toggle-visibilitas')).toBeChecked(); // default: publik
      |                                                       ^ Error: expect(locator).toBeChecked() failed
  83  |     await page.locator('label:has(#toggle-visibilitas)').click();
  84  |     await expect(page.locator('#toggle-visibilitas')).not.toBeChecked();
  85  |     await page.getByRole('button', { name: /Simpan Profil/ }).click();
  86  |     await expect(page.locator('#toast-text')).toHaveText('Profil berhasil disimpan!');
  87  | 
  88  |     const res = await request.get('/api/profil', { headers: auth(verifiedUser.token) });
  89  |     expect((await res.json()).data.profil_publik).toBe(false);
  90  |   });
  91  | });
  92  | 
  93  | test.describe('API profil, privasi, dan mitra', () => {
  94  |   test('menyimpan skill ke profil lengkap dengan level, dan menggantinya', async ({
  95  |     request, admin, verifiedUser, trackTag,
  96  |   }) => {
  97  |     const tag = await buatTag(request, admin);
  98  |     trackTag(tag.nama_tag);
  99  | 
  100 |     const set = await request.put('/api/profil', {
  101 |       headers: auth(verifiedUser.token), data: { tags: [{ tag_id: tag.tag_id, level: 'mahir' }] },
  102 |     });
  103 |     expect(set.status()).toBe(200);
  104 |     const tags = (await set.json()).data.tags;
  105 |     expect(tags.find((t) => t.tag_id === tag.tag_id)).toMatchObject({ level: 'mahir' });
  106 | 
  107 |     const kosong = await request.put('/api/profil', { headers: auth(verifiedUser.token), data: { tags: [] } });
  108 |     expect((await kosong.json()).data.tags).toHaveLength(0);
  109 |   });
  110 | 
  111 |   test('validasi profil: level tidak valid, angkatan 1999, nama kosong -> 400', async ({ request, verifiedUser }) => {
  112 |     const h = { headers: auth(verifiedUser.token) };
  113 |     expect((await request.put('/api/profil', { ...h, data: { tags: [{ tag_id: 1, level: 'dewa' }] } })).status()).toBe(400);
  114 |     expect((await request.put('/api/profil', { ...h, data: { angkatan: 1999 } })).status()).toBe(400);
  115 |     expect((await request.put('/api/profil', { ...h, data: { nama: '' } })).status()).toBe(400);
  116 |   });
  117 | 
  118 |   test('profil privat: orang lain 403, pemilik dan admin 200; profil publik menyembunyikan email & NIM', async ({
  119 |     request, admin, verifiedUser, mahasiswaBaru,
  120 |   }) => {
  121 |     const lain = await mahasiswaBaru();
  122 |     await request.put('/api/profil', { headers: auth(verifiedUser.token), data: { profil_publik: false } });
  123 | 
  124 |     expect((await request.get(`/api/pengguna/${verifiedUser.id}`, { headers: auth(lain.token) })).status()).toBe(403);
  125 |     expect((await request.get(`/api/pengguna/${verifiedUser.id}`, { headers: auth(verifiedUser.token) })).status()).toBe(200);
  126 |     expect((await request.get(`/api/pengguna/${verifiedUser.id}`, { headers: auth(admin.token) })).status()).toBe(200);
  127 | 
  128 |     await request.put('/api/profil', { headers: auth(verifiedUser.token), data: { profil_publik: true } });
  129 |     const publik = await request.get(`/api/pengguna/${verifiedUser.id}`, { headers: auth(lain.token) });
  130 |     expect(publik.status()).toBe(200);
  131 |     const data = (await publik.json()).data;
  132 |     expect(data.email).toBeUndefined();
  133 |     expect(data.nim).toBeUndefined();
  134 |   });
  135 | 
  136 |   test('pengguna yang tidak ada -> 404', async ({ request, verifiedUser }) => {
  137 |     expect((await request.get('/api/pengguna/999999999', { headers: auth(verifiedUser.token) })).status()).toBe(404);
  138 |   });
  139 | 
  140 |   test('pencarian mitra: hanya profil publik, tidak memuat diri sendiri', async ({ request, verifiedUser, mahasiswaBaru }) => {
  141 |     const publik = await mahasiswaBaru();
  142 |     const privat = await mahasiswaBaru();
  143 |     await request.put('/api/profil', { headers: auth(privat.token), data: { profil_publik: false } });
  144 | 
  145 |     const cari = async (nama) => {
  146 |       const res = await request.get(`/api/mitra?q=${encodeURIComponent(nama)}`, { headers: auth(verifiedUser.token) });
  147 |       expect(res.status()).toBe(200);
  148 |       return (await res.json()).data.map((m) => m.pengguna_id);
  149 |     };
  150 |     expect(await cari(publik.nama)).toContain(publik.id);
  151 |     expect(await cari(privat.nama)).not.toContain(privat.id);
  152 |     expect(await cari(verifiedUser.nama)).not.toContain(verifiedUser.id);
  153 |   });
  154 | 
  155 |   test('ganti password: validasi, password lama salah, lalu berhasil', async ({ request, verifiedUser }) => {
  156 |     const h = { headers: auth(verifiedUser.token) };
  157 |     expect((await request.put('/api/auth/password', { ...h, data: { password_lama: 'salah-lama', password_baru: 'PasswordBaru123' } })).status()).toBe(400);
  158 |     expect((await request.put('/api/auth/password', { ...h, data: { password_lama: verifiedUser.password, password_baru: 'pendek' } })).status()).toBe(400);
  159 | 
  160 |     const ok = await request.put('/api/auth/password', { ...h, data: { password_lama: verifiedUser.password, password_baru: 'PasswordBaru123' } });
  161 |     expect(ok.status()).toBe(200);
  162 | 
  163 |     expect((await apiLogin(request, verifiedUser.email, 'PasswordBaru123')).status).toBe(200);
  164 |     expect((await apiLogin(request, verifiedUser.email, verifiedUser.password)).status).toBe(401);
  165 |   });
  166 | });
  167 | 
```