"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden">

      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-red-100 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-50 rounded-full blur-3xl -z-10 opacity-60"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <span className="text-red-600 font-bold tracking-[0.2em] uppercase mb-4 block text-sm md:text-base">
            New Collection 2026
          </span>

          <h1 className="text-5xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight">
            DREAM IN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              CLOTHING.
            </span>
          </h1>

          <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            Ekspresikan dirimu dengan gaya terbaik. Bahan berkualitas tinggi,
            desain eksklusif, dan kenyamanan yang nyata.
          </p>

          <div className="flex gap-4 justify-center items-center flex-col md:flex-row">
            <Link href="/catalog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-10 py-4 rounded-full font-semibold shadow-xl hover:bg-red-700 hover:shadow-2xl transition-all duration-300 w-full md:w-auto"
              >
                Lihat Katalog
              </motion.button>
            </Link>

            <Link href="/about">
              <button className="px-10 py-4 rounded-full font-semibold border-2 border-gray-200 text-gray-600 hover:border-red-600 hover:text-red-600 transition-all duration-300 w-full md:w-auto">
                Tentang Kami
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
