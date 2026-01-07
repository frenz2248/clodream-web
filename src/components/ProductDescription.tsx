"use client";

import { useState } from "react";

export default function ProductDescription({ text }: { text: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tampilan di Kartu */}
      <div className="mb-4">
        <p className="text-gray-500 text-sm line-clamp-2 h-10 leading-relaxed">
          {text}
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="text-red-600 text-xs font-bold hover:underline mt-1 cursor-pointer"
        >
          Lihat selengkapnya
        </button>
      </div>

      {/* Tampilan Popup (Modal) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)} 
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900">Deskripsi Lengkap</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-red-600 transition p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Isi Deskripsi Full */}
            <div className="text-gray-600 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              {text}
            </div>

            {/* Tombol Tutup Bawah */}
            <div className="mt-6 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}