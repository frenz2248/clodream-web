import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

type Params = Promise<{ id: string }>;

// --- DELETE: Hapus Produk ---
export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const idNumber = parseInt(id); 

    // 1. Ambil data produk dari database
    const product = await prisma.product.findUnique({
      where: { id: idNumber },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    // 2. Hapus file gambar fisik di folder (jika ada)
    if (product.image) {
      const imagePath = path.join(process.cwd(), "public", product.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Hapus file
      }
    }

    // 3. Hapus data di database
    await prisma.product.delete({
      where: { id: idNumber },
    });

    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus produk", error: String(error) },
      { status: 500 }
    );
  }
}

// --- PUT: Update Produk ---
export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const idNumber = parseInt(id);
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File | null;
    const oldImage = formData.get("oldImage") as string | null;

    let imageUrl = oldImage ?? null;

    // Jika user upload gambar baru
    if (file && file.size > 0) {
      // A. Hapus gambar lama dulu biar server gak penuh
      if (oldImage) {
        const oldPath = path.join(process.cwd(), "public", oldImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // B. Simpan gambar baru
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      // Buat nama file unik
      const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
      
      // Simpan ke folder public/uploads
      await writeFile(
        path.join(process.cwd(), "public/uploads", filename),
        buffer
      );

      imageUrl = `/uploads/${filename}`;
    }

    // Konversi harga ke integer
    const priceInt = parseInt(price);

    const updatedProduct = await prisma.product.update({
      where: { id: idNumber },
      data: {
        name: name,
        price: priceInt,
        description: description,
        image: imageUrl,
      },
    });

    return NextResponse.json({ 
      message: "Update berhasil", 
      product: updatedProduct 
    });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui produk", error: String(error) },
      { status: 500 }
    );
  }
}