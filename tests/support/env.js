// Memuat .env.playwright (jika ada) lalu mengekspor konfigurasi yang dipakai semua tes.
try {
  process.loadEnvFile('.env.playwright'); // butuh Node 20.12+ (Anda memakai Node 22)
} catch {
  // file tidak ada -> pakai nilai default / environment variable
}

module.exports = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  ADMIN: {
    identifier: process.env.ADMIN_EMAIL || 'admin@kampus.ac.id',
    password: process.env.ADMIN_PASSWORD || 'admin12345',
  },
  // Password untuk semua akun uji yang dibuat otomatis (minimal 8 karakter)
  PASSWORD_UJI: 'Passw0rd!123',
};
