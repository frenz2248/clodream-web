"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* 1. Header Section */}
      <div className="pt-32 pb-12 px-4 text-center bg-gray-50">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
        >
          OUR <span className="text-red-600">STORY</span>
        </motion.h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Lebih dari sekadar pakaian. Clodream adalah tentang mengekspresikan
          impian melalui gaya.
        </p>
      </div>

      {/* 2. Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-24">
        {/* Bagian 1: Visi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
              alt="Clodream Store"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Lahir dari <span className="text-red-600">Impian.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Clodream didirikan pada tahun 2024 dengan satu tujuan sederhana:
              menciptakan pakaian yang membuatmu merasa percaya diri saat
              mengejar mimpimu.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Kami percaya bahwa fashion bukan hanya soal penampilan, tapi juga
              soal kenyamanan dan identitas. Setiap jahitan produk kami dibuat
              dengan ketelitian tinggi dan bahan premium.
            </p>
          </motion.div>
        </div>

        {/* Bagian 2: Kualitas*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl font-bold mb-4">
              Kualitas <span className="text-red-600">Premium.</span>
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Bahan Cotton Combed 100% yang adem.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Sablon tahan lama dan tidak mudah pecah.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Desain eksklusif (Limited Edition).
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2"
          >
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800"
              alt="Quality Material"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
