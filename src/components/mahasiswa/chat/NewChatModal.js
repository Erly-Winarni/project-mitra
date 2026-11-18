"use client";

import { useEffect, useRef, useState } from "react";
import Avatar from "@/components/mahasiswa/Avatar";
import { cariMitra } from "@/lib/frontend/api/mahasiswa";

/**
 * Modal untuk memulai percakapan baru: cari mahasiswa lain (terverifikasi, profil publik)
 * lalu pilih salah satu. Mengembalikan objek mitra lewat onSelect.
 */
export default function NewChatModal({ isOpen, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // Muat daftar mitra (debounce 300ms saat mengetik)
  useEffect(() => {
    if (!isOpen) return;
    let ignore = false;
    setLoading(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const res = await cariMitra(query.trim(), 20);
        if (!ignore) setResults(Array.isArray(res) ? res : []);
      } catch (err) {
        if (!ignore) setError(err.message || "Gagal memuat daftar mahasiswa");
      } finally {
        if (!ignore) setLoading(false);
      }
    }, query ? 300 : 0);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [isOpen, query]);

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    inputRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-inverse-surface/40 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Mulai chat baru"
    >
      <div className="w-full max-w-md max-h-[80vh] bg-surface-container-lowest rounded-[2rem] shadow-xl flex flex-col overflow-hidden">
        <div className="p-space-lg pb-space-sm flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-title-lg font-bold text-on-surface">
              Mulai Chat Baru
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
              search
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama mahasiswa..."
              className="w-full h-10 pl-10 pr-3 rounded-full bg-surface-container-low text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-space-sm pb-space-md flex flex-col gap-1 min-h-[160px]">
          {error ? (
            <p className="p-6 text-center text-body-md text-error">{error}</p>
          ) : loading && results.length === 0 ? (
            <p className="p-6 text-center text-body-md text-on-surface-variant">
              Memuat...
            </p>
          ) : results.length === 0 ? (
            <p className="p-6 text-center text-body-md text-on-surface-variant">
              {query.trim()
                ? `Tidak ada mahasiswa dengan nama "${query}"`
                : "Belum ada mahasiswa lain yang bisa dihubungi"}
            </p>
          ) : (
            results.map((m) => {
              const info = [
                m.jurusan,
                m.angkatan ? `Angkatan ${m.angkatan}` : null,
              ]
                .filter(Boolean)
                .join(" • ");
              return (
                <button
                  key={m.pengguna_id}
                  type="button"
                  onClick={() => onSelect(m)}
                  className="flex items-center gap-3 p-space-sm rounded-2xl hover:bg-surface-container-low text-left transition-colors cursor-pointer"
                >
                  <Avatar
                    nama={m.nama}
                    fotoUrl={m.foto_url}
                    className="w-11 h-11 bg-primary-container text-on-primary text-title-lg"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-body-lg font-semibold text-on-surface truncate">
                      {m.nama}
                    </p>
                    <p className="text-label-md text-on-surface-variant truncate">
                      {info || "Mahasiswa SkillMatch"}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    chat
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
