// Fixture & helper bersama. Akun uji dibuat lewat API (cepat) dan otomatis dihapus setelah tes selesai.
const base = require('@playwright/test');
const { ADMIN, PASSWORD_UJI } = require('./env');

const expect = base.expect;

function kodeUnik() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function dataUserBaru() {
  const s = kodeUnik();
  return {
    nim: `E2E${s}`.toUpperCase().slice(0, 20), // maksimal 20 karakter sesuai validasi
    nama: `Tester ${s}`,
    email: `e2e.${s}@example.com`,
    password: PASSWORD_UJI,
  };
}

async function apiLogin(request, identifier, password) {
  const res = await request.post('/api/auth/login', { data: { identifier, password } });
  return { status: res.status(), body: await res.json().catch(() => null) };
}

async function hapusUser(request, adminToken, kunci) {
  const res = await request.get(`/api/admin/pengguna?q=${encodeURIComponent(kunci)}&limit=100`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  if (!res.ok()) return;
  const json = await res.json();
  for (const u of json.data || []) {
    if (u.nim === kunci || u.email === kunci) {
      await request.delete(`/api/admin/pengguna/${u.pengguna_id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    }
  }
}

async function buatUser(request, admin, { verified }) {
  const data = dataUserBaru();
  const reg = await request.post('/api/auth/register', { data });
  const regJson = await reg.json();
  if (reg.status() !== 201) {
    throw new Error(`Gagal membuat akun uji: ${reg.status()} ${JSON.stringify(regJson)}`);
  }
  const id = regJson.data.user.pengguna_id;
  let token = null;
  let user = null;

  if (verified) {
    const v = await request.patch(`/api/admin/pengguna/${id}`, {
      headers: { Authorization: `Bearer ${admin.token}` },
      data: { is_verified: true },
    });
    expect(v.ok(), 'Verifikasi akun uji via API harus berhasil').toBeTruthy();
    const login = await apiLogin(request, data.email, data.password);
    expect(login.status).toBe(200);
    token = login.body.data.token;
    user = login.body.data.user;
  }
  return { ...data, id, token, user };
}

const test = base.test.extend({
  // Login admin lewat API. Dipakai untuk menyiapkan & membersihkan data.
  admin: async ({ request }, use) => {
    const r = await apiLogin(request, ADMIN.identifier, ADMIN.password);
    if (r.status !== 200) {
      throw new Error(
        `Login admin gagal (status ${r.status}). Pastikan akun admin sudah ada ` +
          `(node --env-file=.env scripts/seed-admin.mjs) dan ADMIN_EMAIL / ADMIN_PASSWORD di ` +
          `.env.playwright sudah benar.`
      );
    }
    await use({ token: r.body.data.token, user: r.body.data.user, ...ADMIN });
  },

  // Mahasiswa yang SUDAH diverifikasi (bisa login). Dihapus otomatis setelah tes.
  verifiedUser: async ({ request, admin }, use) => {
    const u = await buatUser(request, admin, { verified: true });
    await use(u);
    await hapusUser(request, admin.token, u.email);
  },

  // Mahasiswa yang BELUM diverifikasi admin (tidak bisa login).
  pendingUser: async ({ request, admin }, use) => {
    const u = await buatUser(request, admin, { verified: false });
    await use(u);
    await hapusUser(request, admin.token, u.email);
  },

  // Untuk akun yang dibuat lewat UI: panggil trackUser(email) agar ikut dibersihkan.
  trackUser: async ({ request, admin }, use) => {
    const daftar = [];
    await use((kunci) => daftar.push(kunci));
    for (const k of daftar) await hapusUser(request, admin.token, k);
  },
});

// Menyimpan sesi login langsung ke localStorage (tanpa mengisi form) supaya tes lebih cepat.
async function setSesi(page, { token, user }) {
  await page.goto('/login');
  await page.evaluate(
    ([t, u]) => {
      localStorage.setItem('skillmatch_token', t);
      localStorage.setItem('skillmatch_user', JSON.stringify(u));
    },
    [token, user]
  );
}

async function buatProyek(request, token, overrides = {}) {
  const s = kodeUnik();
  const res = await request.post('/api/proyek', {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      judul: `E2E Proyek ${s}`,
      deskripsi: 'Proyek dibuat otomatis oleh Playwright.',
      kategori: 'personal',
      slot_dibutuhkan: 2,
      ...overrides,
    },
  });
  expect(res.status(), 'Pembuatan proyek via API harus 201').toBe(201);
  return (await res.json()).data;
}

module.exports = { test, expect, setSesi, buatProyek, apiLogin, kodeUnik, dataUserBaru };
