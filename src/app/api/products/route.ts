import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";

// Handler untuk metode GET (mendapatkan daftar produk)
export async function GET() {
  try {
    const query = "SELECT * FROM products ORDER BY created_at DESC";
    const [rows] = await db.query(query);
    return NextResponse.json(rows);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Handler untuk metode POST (menambahkan produk baru)
export async function POST(request: Request) {
  try {
    // 1. Baca FormData (Bukan JSON lagi)
    const formData = await request.formData();
    
    // 2. Ambil data dari form
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File;

    // 3. Validasi: Pastikan ada gambar
    if (!file) {
      return NextResponse.json({ error: 'Gambar wajib diupload' }, { status: 400 });
    }

    // 4. Proses Simpan Gambar ke Folder public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Buat nama file unik
    const filename = Date.now() + '_' + file.name.replaceAll(' ', '_');
    
    // Simpan ke harddisk komputer
    await writeFile(
      path.join(process.cwd(), 'public/uploads/' + filename),
      buffer
    );

    // 5. Simpan URL-nya ke Database
    const imageUrl = `/uploads/${filename}`;
    const priceInt = parseInt(price);

    await db.query(
      'INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)',
      [name, priceInt, description, imageUrl]
    );

    return NextResponse.json({ message: 'Produk berhasil disimpan' });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Gagal upload' }, { status: 500 });
  }
}