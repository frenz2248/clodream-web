import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch {
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

// Handler POST: Upload ke Vercel Blob & Simpan DB
export async function POST(request: Request) {
  try {
    // 1. Baca FormData
    const formData = await request.formData();

    // 2. Ambil data input
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    // 3. Validasi Gambar
    if (!file) {
      return NextResponse.json(
        { error: "Gambar wajib diupload" },
        { status: 400 }
      );
    }


    const blob = await put(file.name, file, {
      access: "public",
    });

    const imageUrl = blob.url;

    // 4. Simpan Data ke Database
    const priceInt = parseInt(price);

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: priceInt,
        description: description,
        image: imageUrl, 
      },
    });

    return NextResponse.json({
      message: "Produk berhasil disimpan",
      product: newProduct,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Gagal upload produk" }, { status: 500 });
  }
}
