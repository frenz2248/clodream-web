"use client";

import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import { Product } from "@/types";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // State Mode Edit
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // State Profil Admin
  const [profileData, setProfileData] = useState({
    name: "Super Admin",
    email: "admin@clodream.com",
    newPassword: "",
  });

  // State Input Data Produk
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // --- FETCH DATA ---
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) setProducts(data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // --- HANDLERS ---
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (product: Product) => {
    setIsEditing(true);
    setEditId(product.id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
    });
    setPreviewImage(product.image);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: "", price: "", description: "" });
    setImageFile(null);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("price", formData.price);
      dataToSend.append("description", formData.description);

      if (imageFile) dataToSend.append("image", imageFile);
      if (isEditing && previewImage)
        dataToSend.append("oldImage", previewImage);

      const url =
        isEditing && editId ? `/api/products/${editId}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      await fetch(url, { method, body: dataToSend });

      alert(
        isEditing ? "Produk berhasil diupdate!" : "Produk berhasil disimpan!"
      );
      handleCancelEdit();
      fetchProducts();
    } catch (error) {
      console.error("Gagal submit:", error);
      alert("Gagal menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin hapus?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm("Simpan perubahan profil?")) return;

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (res.ok) {
        alert("Profil berhasil diperbarui!");
        setProfileData({ ...profileData, newPassword: "" });
      } else {
        alert("Gagal update.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-white">

      {/* 1. HEADER SECTION */}
      <div className="pt-32 pb-12 px-4 text-center bg-gray-50 border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 uppercase">
          Dashboard <span className="text-red-600">Admin</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Kelola produk, pantau inventaris, dan atur profil toko Anda di sini.
        </p>
      </div>

      {/* 2. KONTEN DASHBOARD (Form & List) */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* KOLOM KIRI: FORM */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {isEditing ? "Edit Produk" : "Tambah Produk"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Nama */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Input Harga */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Harga
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Input Deskripsi */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Input Gambar */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Gambar Produk
                  </label>
                  {previewImage && (
                    <div className="mb-2 mt-1 relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden border">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      {isEditing && !imageFile && (
                        <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs p-1 w-full text-center">
                          Gambar Saat Ini
                        </div>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                </div>

                {/* Tombol Action */}
                <div className="flex gap-2 pt-2">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className={`flex-1 py-2 rounded-lg font-medium text-white transition disabled:opacity-50 ${
                      isEditing
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {isLoading ? "Loading..." : isEditing ? "Update" : "Simpan"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* KOLOM KANAN: LIST PRODUK */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-800">Daftar Produk</h2>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                Total: {products.length}
              </span>
            </div>

            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No img
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {item.name}
                  </h3>
                  <p className="text-red-600 font-medium">
                    Rp {parseInt(item.price.toString()).toLocaleString("id-ID")}
                  </p>
                  <p className="text-gray-400 text-sm truncate max-w-md">
                    {item.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-orange-500 rounded hover:bg-orange-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-1.5 text-xs font-bold text-red-600 border border-red-200 rounded hover:bg-red-50 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. PENGATURAN AKUN */}
        <div className="border-t pt-12 mt-16">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Pengaturan Akun
            </h2>
            <form
              onSubmit={handleProfileUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  value={profileData.email}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Nama Admin
                </label>
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password Baru{" "}
                  <span className="text-gray-400 font-normal">(Opsional)</span>
                </label>
                <input
                  type="password"
                  placeholder="Isi jika ingin ganti password..."
                  value={profileData.newPassword}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition shadow-lg shadow-gray-200"
                >
                  Simpan Perubahan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
