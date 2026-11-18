// Tes endpoint API langsung (tanpa browser) -> cepat dan stabil.
const { test, expect, dataUserBaru, buatProyek } = require('./support/fixtures');

test.describe('API autentikasi', () => {
  test('register berhasil -> 201, role mahasiswa, belum terverifikasi', async ({ request, trackUser }) => {
    const d = dataUserBaru();
    trackUser(d.email);
    const res = await request.post('/api/auth/register', { data: d });
    expect(res.status()).toBe(201);
    const { data } = await res.json();
    expect(data.user).toMatchObject({ nim: d.nim, email: d.email, role: 'mahasiswa', is_verified: false });
    expect(data.user.password_hash).toBeUndefined(); // hash password tidak boleh bocor
  });

  test('register dengan email tidak valid -> 400', async ({ request }) => {
    const res = await request.post('/api/auth/register', { data: { ...dataUserBaru(), email: 'salah' } });
    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.errors.some((e) => e.field === 'email')).toBeTruthy();
  });

  test('register dengan password pendek -> 400', async ({ request }) => {
    const res = await request.post('/api/auth/register', { data: { ...dataUserBaru(), password: '123' } });
    expect(res.status()).toBe(400);
  });

  test('register dengan NIM ganda -> 409', async ({ request, verifiedUser }) => {
    const res = await request.post('/api/auth/register', {
      data: { ...dataUserBaru(), nim: verifiedUser.nim },
    });
    expect(res.status()).toBe(409);
  });

  test('register tidak bisa memaksa role admin', async ({ request, trackUser }) => {
    const d = { ...dataUserBaru(), role: 'admin', is_verified: true };
    trackUser(d.email);
    const res = await request.post('/api/auth/register', { data: d });
    expect(res.status()).toBe(201);
    const { data } = await res.json();
    expect(data.user.role).toBe('mahasiswa');
    expect(data.user.is_verified).toBe(false);
  });

  test('login berhasil mengembalikan token & data user tanpa password_hash', async ({ request, verifiedUser }) => {
    const res = await request.post('/api/auth/login', {
      data: { identifier: verifiedUser.email, password: verifiedUser.password },
    });
    expect(res.status()).toBe(200);
    const { data } = await res.json();
    expect(data.token).toBeTruthy();
    expect(data.user.password_hash).toBeUndefined();
  });

  test('login tidak membedakan huruf besar/kecil pada email', async ({ request, verifiedUser }) => {
    const res = await request.post('/api/auth/login', {
      data: { identifier: verifiedUser.email.toUpperCase(), password: verifiedUser.password },
    });
    expect(res.status()).toBe(200);
  });

  test('login password salah -> 401', async ({ request, verifiedUser }) => {
    const res = await request.post('/api/auth/login', {
      data: { identifier: verifiedUser.email, password: 'salah-banget' },
    });
    expect(res.status()).toBe(401);
  });

  test('login akun belum diverifikasi -> 403', async ({ request, pendingUser }) => {
    const res = await request.post('/api/auth/login', {
      data: { identifier: pendingUser.email, password: pendingUser.password },
    });
    expect(res.status()).toBe(403);
  });

  test('login tanpa body yang lengkap -> 400', async ({ request }) => {
    const res = await request.post('/api/auth/login', { data: { identifier: '' } });
    expect(res.status()).toBe(400);
  });

  test('SQL injection pada login tidak berhasil', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { identifier: "' OR '1'='1' --", password: "' OR '1'='1' --" },
    });
    expect(res.status()).toBe(401);
  });

  test('/api/auth/me butuh token', async ({ request, verifiedUser }) => {
    expect((await request.get('/api/auth/me')).status()).toBe(401);

    const res = await request.get('/api/auth/me', {
      headers: { Authorization: `Bearer ${verifiedUser.token}` },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).data.email).toBe(verifiedUser.email);
  });

  test('token palsu ditolak', async ({ request }) => {
    const res = await request.get('/api/auth/me', { headers: { Authorization: 'Bearer abc.def.ghi' } });
    expect(res.status()).toBe(401);
  });
});

test.describe('API otorisasi & proyek', () => {
  test('daftar proyek butuh login', async ({ request }) => {
    expect((await request.get('/api/proyek')).status()).toBe(401);
  });

  test('mahasiswa tidak boleh mengakses endpoint admin (403)', async ({ request, verifiedUser }) => {
    const headers = { Authorization: `Bearer ${verifiedUser.token}` };
    expect((await request.get('/api/admin/pengguna', { headers })).status()).toBe(403);
    expect((await request.get('/api/admin/statistik', { headers })).status()).toBe(403);
  });

  test('admin boleh mengakses statistik', async ({ request, admin }) => {
    const res = await request.get('/api/admin/statistik', {
      headers: { Authorization: `Bearer ${admin.token}` },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).success).toBe(true);
  });

  test('membuat proyek lalu menemukannya lewat pencarian', async ({ request, verifiedUser }) => {
    const proyek = await buatProyek(request, verifiedUser.token);
    const res = await request.get(`/api/proyek?q=${encodeURIComponent(proyek.judul)}`, {
      headers: { Authorization: `Bearer ${verifiedUser.token}` },
    });
    expect(res.status()).toBe(200);
    const { data } = await res.json();
    expect(data.map((p) => p.proyek_id)).toContain(proyek.proyek_id);
  });

  test('membuat proyek tanpa judul -> 400', async ({ request, verifiedUser }) => {
    const res = await request.post('/api/proyek', {
      headers: { Authorization: `Bearer ${verifiedUser.token}` },
      data: { deskripsi: 'tanpa judul' },
    });
    expect(res.status()).toBe(400);
  });

  test('membuat proyek dengan kategori tidak valid -> 400', async ({ request, verifiedUser }) => {
    const res = await request.post('/api/proyek', {
      headers: { Authorization: `Bearer ${verifiedUser.token}` },
      data: { judul: 'X', kategori: 'kategori-ngawur' },
    });
    expect(res.status()).toBe(400);
  });

  test('membuat proyek tanpa login -> 401', async ({ request }) => {
    const res = await request.post('/api/proyek', { data: { judul: 'X' } });
    expect(res.status()).toBe(401);
  });

  test('dokumentasi Swagger (/api-docs) dapat dibuka', async ({ request }) => {
    expect((await request.get('/api-docs')).status()).toBe(200);
  });
});
