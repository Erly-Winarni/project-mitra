"use client";

import { useState } from "react";
import { getInitials } from "@/lib/frontend/utils/format";

/**
 * Avatar pengguna: menampilkan foto profil bila ada, jika tidak (atau gagal dimuat)
 * menampilkan inisial nama.
 * - className: ukuran, warna latar & teks inisial (mis. "w-10 h-10 bg-primary-container text-on-primary")
 */
export default function Avatar({ nama, fotoUrl, className = "", alt }) {
  const [failedUrl, setFailedUrl] = useState(null);
  const showPhoto = Boolean(fotoUrl) && failedUrl !== fotoUrl;

  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center shrink-0 font-bold select-none ${className}`}
    >
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fotoUrl}
          alt={alt || nama || "Foto profil"}
          className="w-full h-full object-cover"
          onError={() => setFailedUrl(fotoUrl)}
        />
      ) : (
        <span>{getInitials(nama)}</span>
      )}
    </div>
  );
}
