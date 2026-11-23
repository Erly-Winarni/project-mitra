# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 08-proyek-saya.spec.js >> Proyek Saya - tambah proyek >> memilih skill dibutuhkan lewat picker lalu proyek menyimpan tag-nya
- Location: tests\08-proyek-saya.spec.js:88:3

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /E2E Tag mwtbbz7g5jg9/ })

```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - generic [ref=f1e6] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=f1e7]
    - generic [ref=f1e11]:
      - button "Open issues overlay" [ref=f1e12]:
        - generic [ref=f1e13]:
          - generic [aria-hidden] [ref=f1e14]: "0"
          - generic [ref=f1e15]: "1"
        - generic [ref=f1e16]: Insight
      - button "Collapse issues badge" [ref=f1e17]
  - alert [ref=f1e20]
  - complementary [ref=f1e21]:
    - generic [ref=f1e22]:
      - generic [ref=f1e23]:
        - generic [ref=f1e24]: hub
        - generic [ref=f1e26]:
          - generic [ref=f1e27]: SkillMatch
          - generic [ref=f1e28]: Campus Hub
      - navigation [ref=f1e29]:
        - link "dashboard Dashboard" [ref=f1e30] [cursor=pointer]:
          - /url: /dashboard
          - generic [ref=f1e31]: dashboard
          - generic [ref=f1e32]: Dashboard
        - link "person Profil Saya" [ref=f1e33] [cursor=pointer]:
          - /url: /profil
          - generic [ref=f1e34]: person
          - generic [ref=f1e35]: Profil Saya
        - link "explore Cari Proyek" [ref=f1e36] [cursor=pointer]:
          - /url: /proyek
          - generic [ref=f1e37]: explore
          - generic [ref=f1e38]: Cari Proyek
        - link "folder Proyek Saya" [ref=f1e39] [cursor=pointer]:
          - /url: /proyek-saya
          - generic [ref=f1e40]: folder
          - generic [ref=f1e41]: Proyek Saya
        - link "groups Proyek Tergabung" [ref=f1e42] [cursor=pointer]:
          - /url: /proyek-tergabung
          - generic [ref=f1e43]: groups
          - generic [ref=f1e44]: Proyek Tergabung
        - link "chat_bubble Chat" [ref=f1e45] [cursor=pointer]:
          - /url: /chat
          - generic [ref=f1e46]: chat_bubble
          - generic [ref=f1e47]: Chat
        - link "notifications Notifikasi" [ref=f1e48] [cursor=pointer]:
          - /url: /notifikasi
          - generic [ref=f1e49]: notifications
          - generic [ref=f1e50]: Notifikasi
    - button "logout Keluar" [ref=f1e52]:
      - generic [ref=f1e53]: logout
      - generic [ref=f1e54]: Keluar
  - generic [ref=f1e55]:
    - banner [ref=f1e56]:
      - generic [ref=f1e57]: Universitas Hasanuddin
      - generic [ref=f1e59]:
        - search [ref=f1e60]:
          - generic: search
          - searchbox "Cari proyek" [ref=f1e61]
        - link "notifications" [ref=f1e62] [cursor=pointer]:
          - /url: /notifikasi
        - link "Profil saya" [ref=f1e64] [cursor=pointer]:
          - /url: /profil
          - text: TM
    - main [ref=f1e65]:
      - generic [ref=f1e66]:
        - generic [ref=f1e67]:
          - generic [ref=f1e68]: PROYEK MAHASISWA • Manajemen Tim & Kolaborasi
          - heading "Kelola Proyek Saya" [level=1] [ref=f1e70]
          - paragraph [ref=f1e71]: Kelola rekrutmen tim proyek Anda, tinjau pelamar mahasiswa, dan temukan rekomendasi calon mitra yang sesuai kriteria.
        - generic [ref=f1e72]:
          - generic [ref=f1e73]:
            - generic [ref=f1e74]:
              - generic [ref=f1e75]: create_new_folder
              - generic [ref=f1e77]:
                - heading "Buat Postingan Proyek Baru" [level=2] [ref=f1e78]
                - paragraph [ref=f1e79]: Buka kesempatan kolaborasi tim untuk tugas kuliah, lomba, atau proyek mandiri.
            - generic [ref=f1e80]:
              - generic [ref=f1e81]:
                - generic [ref=f1e82]: Judul Proyek
                - textbox "Judul Proyek" [ref=f1e83]:
                  - /placeholder: "Contoh: Pengembangan Aplikasi Monitoring Sampah Kampus"
                  - text: E2E Tag mwtbbzcyzv9j
              - generic [ref=f1e84]:
                - generic [ref=f1e85]:
                  - generic [ref=f1e86]: Kategori Proyek
                  - generic [ref=f1e87]:
                    - combobox "Kategori Proyek" [ref=f1e88] [cursor=pointer]:
                      - option "Tugas Kuliah"
                      - option "Lomba" [selected]
                      - option "Personal"
                    - generic: expand_more
                - generic [ref=f1e89]:
                  - generic [ref=f1e90]: Jumlah Slot Anggota
                  - textbox "Jumlah Slot Anggota" [ref=f1e91]:
                    - /placeholder: "Contoh: 3 Anggota"
                    - text: 4 Anggota
              - generic [ref=f1e92]:
                - generic [ref=f1e93]: Deskripsi Proyek
                - textbox "Deskripsi Proyek" [ref=f1e94]:
                  - /placeholder: Jelaskan tujuan proyek, pembagian peran, metodologi kerja, dan ekspektasi kontribusi anggota tim...
              - generic [ref=f1e95]:
                - generic [ref=f1e96]: Skill & Minat Dibutuhkan
                - generic [ref=f1e97]:
                  - generic [ref=f1e98]:
                    - button "add Tambah Skill" [ref=f1e99] [cursor=pointer]:
                      - generic [ref=f1e100]: add
                      - text: Tambah Skill
                    - generic [ref=f1e101]:
                      - generic [ref=f1e102]:
                        - generic [ref=f1e103]: search
                        - textbox "Cari skill..." [active] [ref=f1e104]: E2E Tag mwtbbz7g5jg9
                      - generic [ref=f1e105]: Tidak ditemukan "E2E Tag mwtbbz7g5jg9"
                  - button "add Tambah Minat" [ref=f1e108] [cursor=pointer]:
                    - generic [ref=f1e109]: add
                    - text: Tambah Minat
              - generic [ref=f1e110]:
                - generic [ref=f1e111]: Deadline Proyek
                - textbox "Deadline Proyek" [ref=f1e112] [cursor=pointer]
              - button "send Publikasikan Proyek" [ref=f1e113] [cursor=pointer]:
                - generic [ref=f1e114]: send
                - text: Publikasikan Proyek
          - generic [ref=f1e116]:
            - generic [ref=f1e117]: folder_open
            - paragraph [ref=f1e118]: Belum ada postingan proyek. Buat proyek pertamamu lewat formulir di sebelah kiri.
```

# Test source

```ts
  1   | // Fitur: Kelola Proyek Saya (tambah, edit, tutup/buka proyek) + detail & pencarian proyek
  2   | const { test, expect, setSesi, buatProyek, buatTag, kodeUnik, auth } = require('./support/fixtures');
  3   | 
  4   | function tanggalPlus(hari) {
  5   |   const d = new Date();
  6   |   d.setDate(d.getDate() + hari);
  7   |   const p = (n) => String(n).padStart(2, '0');
  8   |   return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  9   | }
  10  | 
  11  | async function proyekSaya(request, token) {
  12  |   const res = await request.get('/api/proyek?mine=true&status=all', { headers: auth(token) });
  13  |   expect(res.status()).toBe(200);
  14  |   return (await res.json()).data;
  15  | }
  16  | 
  17  | test.describe('Proyek Saya - tambah proyek', () => {
  18  |   test.beforeEach(async ({ page, verifiedUser }) => {
  19  |     await setSesi(page, verifiedUser);
  20  |     await page.goto('/proyek-saya');
  21  |     await expect(page.getByRole('heading', { name: 'Kelola Proyek Saya' })).toBeVisible();
  22  |   });
  23  | 
  24  |   test('tampilan awal: form tambah dan pesan belum ada proyek', async ({ page }) => {
  25  |     await expect(page.getByRole('heading', { name: 'Buat Postingan Proyek Baru' })).toBeVisible();
  26  |     await expect(page.getByText('Belum ada postingan proyek')).toBeVisible();
  27  |     await expect(page.getByRole('button', { name: /Publikasikan Proyek/ })).toBeEnabled();
  28  |   });
  29  | 
  30  |   test('menambah proyek lengkap (judul, kategori, slot, deskripsi, deadline)', async ({ page, request, verifiedUser }) => {
  31  |     const judul = `E2E Proyek ${kodeUnik()}`;
  32  |     await page.locator('#judul-proyek').fill(judul);
  33  |     await page.locator('#kategori-proyek').selectOption('tugas_kuliah');
  34  |     await page.locator('#slot-anggota').fill('3 Anggota');
  35  |     await page.locator('#deskripsi-proyek').fill('Proyek ini dibuat oleh tes otomatis Playwright.');
  36  |     await page.locator('#deadline-proyek').fill(tanggalPlus(30));
  37  |     await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();
  38  | 
  39  |     // Kartu proyek muncul di daftar, form dikosongkan kembali
  40  |     await expect(page.getByRole('heading', { name: judul })).toBeVisible();
  41  |     await expect(page.getByText('0 dari 3 Anggota')).toBeVisible();
  42  |     await expect(page.getByText('Tanpa deadline')).toBeHidden();
  43  |     await expect(page.locator('#judul-proyek')).toHaveValue('');
  44  | 
  45  |     // Data benar-benar tersimpan di server
  46  |     const daftar = await proyekSaya(request, verifiedUser.token);
  47  |     const p = daftar.find((x) => x.judul === judul);
  48  |     expect(p).toBeTruthy();
  49  |     expect(p).toMatchObject({ kategori: 'tugas_kuliah', slot_dibutuhkan: 3, status: 'buka' });
  50  |   });
  51  | 
  52  |   test('menambah proyek hanya dengan judul (field lain default)', async ({ page, request, verifiedUser }) => {
  53  |     const judul = `E2E Minimal ${kodeUnik()}`;
  54  |     await page.locator('#judul-proyek').fill(judul);
  55  |     await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();
  56  | 
  57  |     await expect(page.getByRole('heading', { name: judul })).toBeVisible();
  58  |     await expect(page.getByText('Tanpa deadline')).toBeVisible();
  59  |     const p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.judul === judul);
  60  |     expect(p.slot_dibutuhkan).toBe(4); // default slot di form = 4 Anggota
  61  |   });
  62  | 
  63  |   test('judul kosong tidak bisa dikirim (validasi browser)', async ({ page, request, verifiedUser }) => {
  64  |     await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();
  65  |     const kosong = await page.locator('#judul-proyek').evaluate((el) => el.validity.valueMissing);
  66  |     expect(kosong).toBe(true);
  67  |     expect(await proyekSaya(request, verifiedUser.token)).toHaveLength(0);
  68  |   });
  69  | 
  70  |   test('batas slot: minimal 1 dan maksimal 50 anggota', async ({ page, request, verifiedUser }) => {
  71  |     const j1 = `E2E SlotMin ${kodeUnik()}`;
  72  |     await page.locator('#judul-proyek').fill(j1);
  73  |     await page.locator('#slot-anggota').fill('0 Anggota');
  74  |     await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();
  75  |     await expect(page.getByRole('heading', { name: j1 })).toBeVisible();
  76  | 
  77  |     const j2 = `E2E SlotMax ${kodeUnik()}`;
  78  |     await page.locator('#judul-proyek').fill(j2);
  79  |     await page.locator('#slot-anggota').fill('99 Anggota');
  80  |     await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();
  81  |     await expect(page.getByRole('heading', { name: j2 })).toBeVisible();
  82  | 
  83  |     const daftar = await proyekSaya(request, verifiedUser.token);
  84  |     expect(daftar.find((x) => x.judul === j1).slot_dibutuhkan).toBe(1);
  85  |     expect(daftar.find((x) => x.judul === j2).slot_dibutuhkan).toBe(50);
  86  |   });
  87  | 
  88  |   test('memilih skill dibutuhkan lewat picker lalu proyek menyimpan tag-nya', async ({
  89  |     page, request, admin, verifiedUser, trackTag,
  90  |   }) => {
  91  |     const tag = await buatTag(request, admin);
  92  |     trackTag(tag.nama_tag);
  93  |     const judul = `E2E Tag ${kodeUnik()}`;
  94  | 
  95  |     await page.locator('#judul-proyek').fill(judul);
  96  |     await page.getByRole('button', { name: /Tambah Skill/ }).click();
  97  |     await page.getByPlaceholder('Cari skill...').fill(tag.nama_tag);
> 98  |     await page.getByRole('button', { name: new RegExp(tag.nama_tag) }).click();
      |                                                                        ^ Error: locator.click: Test timeout of 60000ms exceeded.
  99  | 
  100 |     // chip skill muncul di form, dan bisa dihapus
  101 |     const hapus = page.getByRole('button', { name: `Hapus skill ${tag.nama_tag}` });
  102 |     await expect(hapus).toBeVisible();
  103 | 
  104 |     await page.getByRole('button', { name: /Publikasikan Proyek/ }).click();
  105 |     await expect(page.getByRole('heading', { name: judul })).toBeVisible();
  106 | 
  107 |     const p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.judul === judul);
  108 |     expect(p.tags.map((t) => t.nama_tag)).toContain(tag.nama_tag);
  109 |   });
  110 | 
  111 |   test('chip skill dapat dihapus sebelum dipublikasikan', async ({ page, request, admin, trackTag }) => {
  112 |     const tag = await buatTag(request, admin);
  113 |     trackTag(tag.nama_tag);
  114 |     await page.getByRole('button', { name: /Tambah Skill/ }).click();
  115 |     await page.getByPlaceholder('Cari skill...').fill(tag.nama_tag);
  116 |     await page.getByRole('button', { name: new RegExp(tag.nama_tag) }).click();
  117 |     await page.getByRole('button', { name: `Hapus skill ${tag.nama_tag}` }).click();
  118 |     await expect(page.getByRole('button', { name: `Hapus skill ${tag.nama_tag}` })).toBeHidden();
  119 |   });
  120 | });
  121 | 
  122 | test.describe('Proyek Saya - edit, tutup, buka', () => {
  123 |   let proyek;
  124 | 
  125 |   test.beforeEach(async ({ page, request, verifiedUser }) => {
  126 |     proyek = await buatProyek(request, verifiedUser.token, { slot_dibutuhkan: 2 });
  127 |     await setSesi(page, verifiedUser);
  128 |     await page.goto('/proyek-saya');
  129 |     await expect(page.getByRole('heading', { name: proyek.judul })).toBeVisible();
  130 |   });
  131 | 
  132 |   test('edit proyek mengubah judul dan slot', async ({ page, request, verifiedUser }) => {
  133 |     await page.getByRole('button', { name: /\bEdit\b/ }).click();
  134 |     await expect(page.getByRole('heading', { name: 'Edit Postingan Proyek' })).toBeVisible();
  135 |     await expect(page.locator('#judul-proyek')).toHaveValue(proyek.judul);
  136 | 
  137 |     const baru = `${proyek.judul} (revisi)`;
  138 |     await page.locator('#judul-proyek').fill(baru);
  139 |     await page.locator('#slot-anggota').fill('5 Anggota');
  140 |     await page.getByRole('button', { name: /Simpan Perubahan/ }).click();
  141 | 
  142 |     await expect(page.getByRole('heading', { name: baru })).toBeVisible();
  143 |     await expect(page.getByRole('heading', { name: 'Buat Postingan Proyek Baru' })).toBeVisible();
  144 | 
  145 |     const p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.proyek_id === proyek.proyek_id);
  146 |     expect(p).toMatchObject({ judul: baru, slot_dibutuhkan: 5 });
  147 |   });
  148 | 
  149 |   test('tombol Batal membatalkan mode edit', async ({ page }) => {
  150 |     await page.getByRole('button', { name: /\bEdit\b/ }).click();
  151 |     await expect(page.getByRole('heading', { name: 'Edit Postingan Proyek' })).toBeVisible();
  152 |     await page.getByRole('button', { name: 'Batal' }).click();
  153 |     await expect(page.getByRole('heading', { name: 'Buat Postingan Proyek Baru' })).toBeVisible();
  154 |   });
  155 | 
  156 |   test('menutup postingan lalu membukanya kembali', async ({ page, request, verifiedUser }) => {
  157 |     // Playwright menolak dialog confirm() secara default, jadi harus diterima manual
  158 |     page.once('dialog', (d) => d.accept());
  159 |     await page.getByRole('button', { name: /Tutup Postingan/ }).click();
  160 |     await expect(page.getByText('Ditutup', { exact: true })).toBeVisible();
  161 |     await expect(page.getByRole('button', { name: /Buka Kembali/ })).toBeVisible();
  162 | 
  163 |     let p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.proyek_id === proyek.proyek_id);
  164 |     expect(p.status).toBe('ditutup');
  165 | 
  166 |     page.once('dialog', (d) => d.accept());
  167 |     await page.getByRole('button', { name: /Buka Kembali/ }).click();
  168 |     await expect(page.getByText('Buka', { exact: true })).toBeVisible();
  169 |     p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.proyek_id === proyek.proyek_id);
  170 |     expect(p.status).toBe('buka');
  171 |   });
  172 | 
  173 |   test('membatalkan dialog konfirmasi tidak menutup proyek', async ({ page, request, verifiedUser }) => {
  174 |     page.once('dialog', (d) => d.dismiss());
  175 |     await page.getByRole('button', { name: /Tutup Postingan/ }).click();
  176 |     await expect(page.getByRole('button', { name: /Tutup Postingan/ })).toBeVisible();
  177 |     const p = (await proyekSaya(request, verifiedUser.token)).find((x) => x.proyek_id === proyek.proyek_id);
  178 |     expect(p.status).toBe('buka');
  179 |   });
  180 | });
  181 | 
  182 | test.describe('API Proyek', () => {
  183 |   test('pemilik dapat mengubah proyek; non-pemilik ditolak (403)', async ({ request, verifiedUser, mahasiswaBaru }) => {
  184 |     const proyek = await buatProyek(request, verifiedUser.token);
  185 |     const orangLain = await mahasiswaBaru();
  186 | 
  187 |     const ok = await request.put(`/api/proyek/${proyek.proyek_id}`, {
  188 |       headers: auth(verifiedUser.token), data: { judul: 'Judul Baru E2E' },
  189 |     });
  190 |     expect(ok.status()).toBe(200);
  191 |     expect((await ok.json()).data.judul).toBe('Judul Baru E2E');
  192 | 
  193 |     const tolak = await request.put(`/api/proyek/${proyek.proyek_id}`, {
  194 |       headers: auth(orangLain.token), data: { judul: 'Dibajak' },
  195 |     });
  196 |     expect(tolak.status()).toBe(403);
  197 |   });
  198 | 
```