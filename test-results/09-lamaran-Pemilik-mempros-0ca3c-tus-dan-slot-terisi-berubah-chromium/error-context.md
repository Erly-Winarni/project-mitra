# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 09-lamaran.spec.js >> Pemilik memproses pelamar (tampilan) >> pemilik menerima pelamar -> status dan slot terisi berubah
- Location: tests\09-lamaran.spec.js:79:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByText('Tester mwx8eaoy36gg').first()
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" getByText('Tester mwx8eaoy36gg').first() with timeout 10000ms
  - waiting for getByText('Tester mwx8eaoy36gg').first()
    18 × locator resolved to <span class="text-pill-tag text-on-surface font-bold truncate">Tester mwx8eaoy36gg</span>
       - unexpected value "hidden"

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
  - text: PROYEK MAHASISWA • Manajemen Tim & Kolaborasi
  - heading "Kelola Proyek Saya" [level=1]
  - paragraph: Kelola rekrutmen tim proyek Anda, tinjau pelamar mahasiswa, dan temukan rekomendasi calon mitra yang sesuai kriteria.
  - text: create_new_folder
  - heading "Buat Postingan Proyek Baru" [level=2]
  - paragraph: Buka kesempatan kolaborasi tim untuk tugas kuliah, lomba, atau proyek mandiri.
  - text: Judul Proyek
  - textbox "Judul Proyek":
    - /placeholder: "Contoh: Pengembangan Aplikasi Monitoring Sampah Kampus"
  - text: Kategori Proyek
  - combobox "Kategori Proyek":
    - option "Tugas Kuliah"
    - option "Lomba" [selected]
    - option "Personal"
  - text: expand_more Jumlah Slot Anggota
  - textbox "Jumlah Slot Anggota":
    - /placeholder: "Contoh: 3 Anggota"
    - text: 4 Anggota
  - text: Deskripsi Proyek
  - textbox "Deskripsi Proyek":
    - /placeholder: Jelaskan tujuan proyek, pembagian peran, metodologi kerja, dan ekspektasi kontribusi anggota tim...
  - text: Skill & Minat Dibutuhkan
  - button "add Tambah Skill"
  - button "add Tambah Minat"
  - text: Deadline Proyek
  - textbox "Deadline Proyek"
  - button "send Publikasikan Proyek"
  - text: Buka
  - heading "E2E Proyek mwx8eb1flp0y" [level=3]
  - button "edit Edit"
  - button "lock Tutup Postingan"
  - text: "Kategori:"
  - strong: Personal
  - text: "Slot:"
  - strong: 0 dari 2 Anggota
  - text: "Deadline:"
  - strong: Tanpa deadline
  - heading "Daftar Pelamar" [level=4]
  - text: 1 Menunggu Respon TM Tester mwx8eaoy36gg - • Siap membantu
  - link "Chat dengan Tester mwx8eaoy36gg":
    - /url: /chat?user=464
    - text: chat
  - text: Pending
  - button "Terima"
  - button "Tolak"
  - heading "Rekomendasi Calon Mitra untuk Proyek Ini" [level=3]
  - paragraph: Mahasiswa dengan skill yang cocok dengan kriteria proyek Anda
  - paragraph: Belum ada rekomendasi untuk proyek ini
```

# Test source

```ts
  1   | // Fitur: alur kolaborasi lintas pengguna (melamar -> pemilik menerima/menolak -> status & notifikasi)
  2   | const {
  3   |   test, expect, setSesi, buatProyek, lamarProyek, prosesLamaran, auth,
  4   | } = require('./support/fixtures');
  5   | 
  6   | async function daftarNotif(request, token) {
  7   |   const res = await request.get('/api/notifikasi', { headers: auth(token) });
  8   |   expect(res.status()).toBe(200);
  9   |   return (await res.json()).data;
  10  | }
  11  | 
  12  | test.describe('Melamar proyek (tampilan)', () => {
  13  |   test('mahasiswa melamar proyek lewat halaman detail', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
  14  |     const pelamar = await mahasiswaBaru();
  15  |     const proyek = await buatProyek(request, verifiedUser.token);
  16  | 
  17  |     await setSesi(page, pelamar);
  18  |     await page.goto(`/proyek/${proyek.proyek_id}`);
  19  |     await expect(page.getByRole('heading', { name: proyek.judul }).first()).toBeVisible();
  20  | 
  21  |     await page.locator('#apply-message').fill('Saya bisa mengerjakan bagian frontend.');
  22  |     await page.getByRole('button', { name: /Ajukan Diri Bergabung/ }).click();
  23  | 
  24  |     await expect(page.getByRole('button', { name: /Lamaran Terkirim/ })).toBeDisabled();
  25  |     await expect(page.getByText('Menunggu Keputusan Pemilik Proyek')).toBeVisible();
  26  | 
  27  |     const res = await request.get('/api/aplikasi', { headers: auth(pelamar.token) });
  28  |     const lamaran = (await res.json()).data.find((a) => a.proyek_id === proyek.proyek_id);
  29  |     expect(lamaran).toMatchObject({ status: 'pending', pesan: 'Saya bisa mengerjakan bagian frontend.' });
  30  |   });
  31  | 
  32  |   test('melamar tanpa pesan (opsional) tetap berhasil', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
  33  |     const pelamar = await mahasiswaBaru();
  34  |     const proyek = await buatProyek(request, verifiedUser.token);
  35  |     await setSesi(page, pelamar);
  36  |     await page.goto(`/proyek/${proyek.proyek_id}`);
  37  |     await page.getByRole('button', { name: /Ajukan Diri Bergabung/ }).click();
  38  |     await expect(page.getByRole('button', { name: /Lamaran Terkirim/ })).toBeDisabled();
  39  |   });
  40  | 
  41  |   test('pemilik tidak bisa melamar proyek sendiri', async ({ page, request, verifiedUser }) => {
  42  |     const proyek = await buatProyek(request, verifiedUser.token);
  43  |     await setSesi(page, verifiedUser);
  44  |     await page.goto(`/proyek/${proyek.proyek_id}`);
  45  |     await expect(page.getByRole('button', { name: /Ini Proyek Kamu/ })).toBeDisabled();
  46  |   });
  47  | 
  48  |   test('yang sudah melamar tidak bisa melamar lagi', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
  49  |     const pelamar = await mahasiswaBaru();
  50  |     const proyek = await buatProyek(request, verifiedUser.token);
  51  |     await lamarProyek(request, pelamar.token, proyek.proyek_id);
  52  | 
  53  |     await setSesi(page, pelamar);
  54  |     await page.goto(`/proyek/${proyek.proyek_id}`);
  55  |     await expect(page.getByRole('button', { name: /Lamaran Terkirim/ })).toBeDisabled();
  56  |     await expect(page.locator('#apply-message')).toBeDisabled();
  57  |   });
  58  | 
  59  |   test('proyek yang sudah ditutup tidak bisa dilamar', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
  60  |     const pelamar = await mahasiswaBaru();
  61  |     const proyek = await buatProyek(request, verifiedUser.token);
  62  |     await request.put(`/api/proyek/${proyek.proyek_id}`, { headers: auth(verifiedUser.token), data: { status: 'ditutup' } });
  63  | 
  64  |     await setSesi(page, pelamar);
  65  |     await page.goto(`/proyek/${proyek.proyek_id}`);
  66  |     await expect(page.getByRole('button', { name: /Proyek Ditutup/ })).toBeDisabled();
  67  |   });
  68  | 
  69  |   test('proyek yang tidak ada menampilkan halaman "tidak ditemukan"', async ({ page, verifiedUser }) => {
  70  |     await setSesi(page, verifiedUser);
  71  |     await page.goto('/proyek/999999999');
  72  |     await expect(page.getByRole('heading', { name: 'Proyek tidak ditemukan' })).toBeVisible();
  73  |     await page.getByRole('link', { name: /Kembali ke Pencarian/ }).click();
  74  |     await expect(page).toHaveURL(/\/proyek$/);
  75  |   });
  76  | });
  77  | 
  78  | test.describe('Pemilik memproses pelamar (tampilan)', () => {
  79  |   test('pemilik menerima pelamar -> status dan slot terisi berubah', async ({
  80  |     page, request, verifiedUser, mahasiswaBaru,
  81  |   }) => {
  82  |     const pelamar = await mahasiswaBaru();
  83  |     const proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 2 });
  84  |     const lamaran = await lamarProyek(request, pelamar.token, proyek.proyek_id, 'Siap membantu');
  85  | 
  86  |     await setSesi(page, verifiedUser);
  87  |     await page.goto('/proyek-saya');
> 88  |     await expect(page.getByText(pelamar.nama).first()).toBeVisible();
      |                                                        ^ Error: expect(locator).toBeVisible() failed
  89  |     await expect(page.getByText('1 Menunggu Respon')).toBeVisible();
  90  | 
  91  |     await page.getByRole('button', { name: 'Terima', exact: true }).click();
  92  |     await expect(page.getByText('Diterima', { exact: true })).toBeVisible();
  93  |     await expect(page.getByText('1 dari 2 Anggota')).toBeVisible();
  94  | 
  95  |     // Sisi server & sisi pelamar
  96  |     const res = await request.get('/api/aplikasi', { headers: auth(pelamar.token) });
  97  |     const l = (await res.json()).data.find((a) => a.aplikasi_id === lamaran.aplikasi_id);
  98  |     expect(l.status).toBe('diterima');
  99  |   });
  100 | 
  101 |   test('pemilik menolak pelamar (dengan konfirmasi)', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
  102 |     const pelamar = await mahasiswaBaru();
  103 |     const proyek = await buatProyek(request, verifiedUser.token);
  104 |     const lamaran = await lamarProyek(request, pelamar.token, proyek.proyek_id);
  105 | 
  106 |     await setSesi(page, verifiedUser);
  107 |     await page.goto('/proyek-saya');
  108 |     await expect(page.getByText(pelamar.nama).first()).toBeVisible();
  109 | 
  110 |     page.once('dialog', (d) => d.accept());
  111 |     await page.getByRole('button', { name: 'Tolak', exact: true }).click();
  112 |     await expect(page.getByText('Ditolak', { exact: true })).toBeVisible();
  113 | 
  114 |     const res = await request.get('/api/aplikasi', { headers: auth(pelamar.token) });
  115 |     expect((await res.json()).data.find((a) => a.aplikasi_id === lamaran.aplikasi_id).status).toBe('ditolak');
  116 |   });
  117 | 
  118 |   test('batal pada dialog konfirmasi tidak menolak pelamar', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
  119 |     const pelamar = await mahasiswaBaru();
  120 |     const proyek = await buatProyek(request, verifiedUser.token);
  121 |     await lamarProyek(request, pelamar.token, proyek.proyek_id);
  122 | 
  123 |     await setSesi(page, verifiedUser);
  124 |     await page.goto('/proyek-saya');
  125 |     page.once('dialog', (d) => d.dismiss());
  126 |     await page.getByRole('button', { name: 'Tolak', exact: true }).click();
  127 |     await expect(page.getByRole('button', { name: 'Terima', exact: true })).toBeVisible();
  128 |   });
  129 | 
  130 |   test('menerima pelamar terakhir mengisi slot dan menutup proyek otomatis', async ({
  131 |     page, request, verifiedUser, mahasiswaBaru,
  132 |   }) => {
  133 |     const pelamar = await mahasiswaBaru();
  134 |     const proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 1 });
  135 |     await lamarProyek(request, pelamar.token, proyek.proyek_id);
  136 | 
  137 |     await setSesi(page, verifiedUser);
  138 |     await page.goto('/proyek-saya');
  139 |     await page.getByRole('button', { name: 'Terima', exact: true }).click();
  140 |     await expect(page.getByText('Ditutup', { exact: true })).toBeVisible();
  141 | 
  142 |     const detail = await request.get(`/api/proyek/${proyek.proyek_id}`, { headers: auth(verifiedUser.token) });
  143 |     expect((await detail.json()).data.status).toBe('ditutup');
  144 |   });
  145 | });
  146 | 
  147 | test.describe('Proyek Tergabung (tampilan)', () => {
  148 |   test('pelamar melihat lamarannya di tab Semua Lamaran', async ({ page, request, verifiedUser, mahasiswaBaru }) => {
  149 |     const pelamar = await mahasiswaBaru();
  150 |     const proyek = await buatProyek(request, verifiedUser.token);
  151 |     await lamarProyek(request, pelamar.token, proyek.proyek_id, 'Pesan lamaran uji');
  152 | 
  153 |     await setSesi(page, pelamar);
  154 |     await page.goto('/proyek-tergabung');
  155 |     await page.getByRole('button', { name: /Semua Lamaran/ }).click();
  156 |     await expect(page.getByRole('link', { name: proyek.judul })).toBeVisible();
  157 |     await expect(page.getByText('Menunggu Respon').first()).toBeVisible();
  158 |     await expect(page.getByText('Pesan lamaran uji')).toBeVisible();
  159 |   });
  160 | 
  161 |   test('pelamar yang diterima melihat proyek di tab Semua Tergabung sebagai Anggota Tim', async ({
  162 |     page, request, verifiedUser, mahasiswaBaru,
  163 |   }) => {
  164 |     const pelamar = await mahasiswaBaru();
  165 |     const proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 3 });
  166 |     const lamaran = await lamarProyek(request, pelamar.token, proyek.proyek_id);
  167 |     expect((await prosesLamaran(request, verifiedUser.token, lamaran.aplikasi_id, 'diterima')).status()).toBe(200);
  168 | 
  169 |     await setSesi(page, pelamar);
  170 |     await page.goto('/proyek-tergabung');
  171 |     await expect(page.getByRole('link', { name: proyek.judul })).toBeVisible();
  172 |     await expect(page.getByText('Anggota Tim').first()).toBeVisible();
  173 |     await expect(page.getByText('Chat Ketua')).toBeVisible();
  174 |   });
  175 | 
  176 |   test('pemilik melihat proyeknya di Proyek Tergabung sebagai Ketua Tim', async ({ page, request, verifiedUser }) => {
  177 |     const proyek = await buatProyek(request, verifiedUser.token);
  178 |     await setSesi(page, verifiedUser);
  179 |     await page.goto('/proyek-tergabung');
  180 |     await expect(page.getByRole('link', { name: proyek.judul })).toBeVisible();
  181 |     await expect(page.getByText('Ketua Tim (Pemilik)')).toBeVisible();
  182 |   });
  183 | 
  184 |   test('pencarian lokal memfilter daftar dan menampilkan pesan kosong', async ({ page, request, verifiedUser }) => {
  185 |     const proyek = await buatProyek(request, verifiedUser.token);
  186 |     await setSesi(page, verifiedUser);
  187 |     await page.goto('/proyek-tergabung');
  188 |     const kotak = page.getByPlaceholder('Cari dalam daftar...');
```