import { prisma } from "@/lib/prisma";
import Image from "next/image";
import ProductDescription from "@/components/ProductDescription";

export const dynamic = "force-dynamic";

// Tipe data sederhana
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | null;
};

// Helper function untuk format Rupiah
const formatRupiah = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

export default async function CatalogPage() {
  // 1. Ambil Data Langsung dari Database (Server Side)
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Header Catalog */}
      <div className="pt-32 pb-12 px-4 text-center bg-gray-50">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2 animate-fade-in-up">
          KOLEKSI <span className="text-red-600">TERBARU</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto mt-4">
          Temukan outfit impianmu dengan kualitas terbaik dan desain eksklusif
          dari Clodream.
        </p>
      </div>

      {/* Grid Produk */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Empty State (Jika database kosong) */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              Belum ada produk yang dirilis.
            </p>
            <p className="text-sm text-gray-400">Cek kembali nanti ya!</p>
          </div>
        ) : (
          /* List Produk */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// KOMPONEN KARTU PRODUK
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 relative">
      {/* Bagian Gambar */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            No Image
          </div>
        )}
      </div>

      {/* Bagian Info Produk */}
      <div className="flex flex-col h-auto">
        <div className="p-6 flex flex-col h-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>

          <ProductDescription text={product.description} />

          <div className="mt-auto pt-4 border-t border-gray-50">
            <span className="text-lg font-bold text-red-600">
              {formatRupiah(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
