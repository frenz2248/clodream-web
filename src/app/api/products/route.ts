import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { prisma } from "@/lib/prisma";

// Handler GET: Ambil daftar produk
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data produk" }, 
      { status: 500 }
    );
  }
}

// Handler POST: Upload & Simpan Produk Baru
export async function POST(request: Request) {
  try {
    // 1. Baca FormData
    const formData = await request.formData();
    
    // 2. Ambil data input
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File;

    // 3. Validasi Gambar
    if (!file) {
      return NextResponse.json({ error: 'Gambar wajib diupload' }, { status: 400 });
    }

    // 4. Proses Buffer Gambar
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Siapkan Nama File & Folder
    const filename = Date.now() + '_' + file.name.replaceAll(' ', '_');
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    await mkdir(uploadDir, { recursive: true });

    // 6. Simpan File ke Harddisk
    await writeFile(path.join(uploadDir, filename), buffer);

    // 7. Simpan Data ke Database
    const imageUrl = `/uploads/${filename}`;
    const priceInt = parseInt(price);

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: priceInt,
        description: description,
        image: imageUrl
      }
    });

    return NextResponse.json({ 
      message: 'Produk berhasil disimpan', 
      product: newProduct 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Gagal upload produk' }, { status: 500 });
  }
}