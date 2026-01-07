"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import { motion } from "framer-motion";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Ambil Data dari API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        // Pengaman: Pastikan data berupa Array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Gagal ambil data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white">

      {/* Header Catalog */}
      <div className="pt-32 pb-12 px-4 text-center bg-gray-50">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2"
        >
          KOLEKSI <span className="text-red-600">TERBARU</span>
        </motion.h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Temukan outfit impianmu dengan kualitas terbaik dan desain eksklusif
          dari Clodream.
        </p>
      </div>

      {/* Grid Produk */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20 text-gray-400">
            <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            Sedang memuat produk...
          </div>
        )}

        {/* Empty State (Jika tidak ada barang) */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              Belum ada produk yang dirilis.
            </p>
            <p className="text-sm text-gray-400">Cek kembali nanti ya!</p>
          </div>
        )}

        {/* List Produk */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

// --- KOMPONEN KARTU PRODUK---
function ProductCard({ product, index }: { product: Product; index: number }) {
  // Fungsi ubah angka jadi Rupiah
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300"
    >

      <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            No Image
          </div>
        )}

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-black">
          NEW
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-red-600">
            {formatRupiah(product.price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
