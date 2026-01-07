import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

type Params = Promise<{ id: string }>;

// DELETE 
export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;

    // 1. Ambil data produk
    const [rows] = await db.query(
      "SELECT image FROM products WHERE id = ?",
      [id]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    const imagePath = (rows[0] as { image: string }).image;

    // 2. Hapus file gambar jika ada
    if (imagePath) {
      const fullPath = path.join(process.cwd(), "public", imagePath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    // 3. Hapus data produk
    await db.query("DELETE FROM products WHERE id = ?", [id]);

    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus produk", error },
      { status: 500 }
    );
  }
}

// PUT 
export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File | null;
    const oldImage = formData.get("oldImage") as string | null;

    let imageUrl = oldImage ?? "";

    // Jika upload gambar baru
    if (file && file.size > 0) {
      // 1. Hapus gambar lama
      if (oldImage) {
        const oldPath = path.join(process.cwd(), "public", oldImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // 2. Simpan gambar baru
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

      await writeFile(
        path.join(process.cwd(), "public/uploads", filename),
        buffer
      );

      imageUrl = `/uploads/${filename}`;
    }

    const priceInt = parseInt(price);

    await db.query(
      "UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?",
      [name, priceInt, description, imageUrl, id]
    );

    return NextResponse.json({ message: "Update berhasil" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal memperbarui produk", error },
      { status: 500 }
    );
  }
}
