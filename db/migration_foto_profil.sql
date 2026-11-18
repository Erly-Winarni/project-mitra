-- Jalankan SEKALI di database db_mitra_proyek yang sudah ada (jika sudah pernah menjalankan schema.sql)
ALTER TABLE pengguna ADD COLUMN IF NOT EXISTS foto_url VARCHAR(255);
