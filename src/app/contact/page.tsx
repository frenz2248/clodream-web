"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="pt-32 pb-16 px-4 max-w-6xl mx-auto space-y-16">
        {/* 1. HEADER & INFO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* KOLOM KIRI: Info Alamat */}
          <div className="bg-gray-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>

            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-extrabold mb-8"
              >
                GET IN <span className="text-red-500">TOUCH</span>
              </motion.h1>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-red-500 text-xl">📍</div>
                  <p className="text-gray-300 leading-relaxed">
                    <span className="font-bold text-white block mb-1">
                      Clodream Store HQ
                    </span>
                    Jl. Kh Agus Salim no. 59
                    <br />
                    Desa Darungan, Kec. Pare, Kab. Kediri, Jawa Timur
                    <br />
                    Indonesia
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-red-500 text-xl">⏰</div>
                  <p className="text-gray-300">
                    Buka Setiap Hari
                    <br />
                    10.00 - 21.00 WIB
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-sm text-gray-500">© 2026 Clodream Inc.</p>
            </div>
          </div>

          {/* KOLOM KANAN: Social Media */}
          <div className="p-10 flex flex-col justify-center bg-white">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Hubungi Kami Langsung
              </h3>
              <p className="text-gray-500 mb-8">
                Ingin tanya stok atau konsultasi ukuran? Chat kami melalui
                platform di bawah ini.
              </p>

              <div className="space-y-4">
                {/* Tombol WhatsApp */}
                <a
                  href="https://wa.me/6281232037618" 
                  target="_blank"
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 group transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl group-hover:scale-110 transition">
                    💬
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-green-700">
                      WhatsApp
                    </h4>
                    <p className="text-sm text-gray-500">
                      Chat Admin Fast Response
                    </p>
                  </div>
                </a>

                {/* Tombol Instagram */}
                <a
                  href="https://instagram.com/clodream.official"
                  target="_blank"
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 group transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 text-2xl group-hover:scale-110 transition">
                    📸
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-pink-700">
                      Instagram
                    </h4>
                    <p className="text-sm text-gray-500">
                      Lihat Galeri & Testimoni
                    </p>
                  </div>
                </a>

                {/* Tombol Email */}
                <a
                  href="clodreamofficial@gmail.com"
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 group transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl group-hover:scale-110 transition">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-red-700">
                      Email
                    </h4>
                    <p className="text-sm text-gray-500">Kerjasama & Bisnis</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 2. MAP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl border border-gray-200"
        >
          {/* Google Maps Embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.185440812511!2d112.15492711026496!3d-7.770150892216887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e785d6b89c6bfe7%3A0x6ea1c7012ec799f9!2sRumah%20Rofiq!5e0!3m2!1sid!2sid!4v1767591058525!5m2!1sid!2sid"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-100 md:h-125"
          ></iframe>

          <div className="bg-white p-4 text-center">
            <a
              href="https://maps.google.com"
              target="_blank"
              className="text-red-600 font-semibold hover:underline text-sm"
            >
              Buka di Google Maps &rarr;
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

