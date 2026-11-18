"use client";

import { useEffect, useState } from "react";
import { getInitials, getStoredProfilePhoto } from "@/lib/frontend/utils/format";

export default function ChatRoomHeader({ recipient }) {
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const id = recipient?.pengguna_id;
    const nim = recipient?.nim;

    function updatePhoto() {
      if (id || nim) {
        const p = getStoredProfilePhoto(id, nim);
        setPhoto(p);
      } else {
        setPhoto("");
      }
    }

    updatePhoto();
    window.addEventListener("foto_profil:berubah", updatePhoto);
    return () => {
      window.removeEventListener("foto_profil:berubah", updatePhoto);
    };
  }, [recipient?.pengguna_id, recipient?.nim]);

  if (!recipient) return null;

  const initials = getInitials(recipient.nama);
  const displayPhoto = recipient.foto || photo;

  // Subtitle: "{jurusan} • Angkatan {angkatan}" (bagian null dibuang; bila keduanya null "Mahasiswa SkillMatch")
  const parts = [];
  if (recipient.jurusan) parts.push(recipient.jurusan);
  if (recipient.angkatan) parts.push(`Angkatan ${recipient.angkatan}`);
  const subtitle = parts.length > 0 ? parts.join(" • ") : "Mahasiswa SkillMatch";

  const matchPercent =
    recipient.match_score != null ? Math.round(recipient.match_score) : null;

  return (
    <div className="h-20 px-space-lg flex items-center justify-between bg-surface-container-lowest shadow-sm z-10 shrink-0 border-b border-outline-variant/20">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary text-title-lg font-bold flex items-center justify-center shadow-md overflow-hidden">
            {displayPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={displayPhoto}
                alt={recipient.nama || "Profil"}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              initials
            )}
          </div>
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-title-lg font-bold text-on-surface truncate">
              {recipient.nama}
            </h2>
            {matchPercent != null && (
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md font-semibold">
                {matchPercent}% Match
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant text-label-md">
            <span className="truncate">{subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

