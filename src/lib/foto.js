import path from 'node:path';
import { unlink } from 'node:fs/promises';

// Foto profil disimpan di <root proyek>/uploads/avatars (di luar /public supaya
// file yang diunggah saat runtime tetap bisa dilayani, lihat GET /api/foto/[file]).
export const AVATAR_DIR = path.join(process.cwd(), 'uploads', 'avatars');
export const MAX_FOTO_BYTES = 2 * 1024 * 1024; // 2 MB
export const FOTO_URL_PREFIX = '/api/foto/';
export const NAMA_FILE_RE = /^\d+-\d+\.(jpg|png|webp)$/;

export const MIME_BY_EXT = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

// Deteksi tipe dari isi file (magic bytes), bukan dari nama/Content-Type kiriman klien.
export function deteksiTipeGambar(buf) {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { ext: 'jpg' };
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])))
    return { ext: 'png' };
  if (buf.length >= 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP')
    return { ext: 'webp' };
  return null;
}

// Hapus file foto lama dari disk (diam-diam jika sudah tidak ada).
export async function hapusFileFoto(fotoUrl) {
  if (typeof fotoUrl !== 'string' || !fotoUrl.startsWith(FOTO_URL_PREFIX)) return;
  const nama = fotoUrl.slice(FOTO_URL_PREFIX.length);
  if (!NAMA_FILE_RE.test(nama)) return;
  try {
    await unlink(path.join(AVATAR_DIR, nama));
  } catch {
    // file sudah tidak ada
  }
}
