import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { put, del } from "@vercel/blob";

export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>;

// DELETE: Hapus Produk & Hapus Gambar di Blob
export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const idNumber = parseInt(id); 

    // 1. Cek produk ada atau tidak
    const product = await prisma.product.findUnique({
      where: { id: idNumber },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    // 2. Hapus gambar dari Vercel Blob jika ada
    if (product.image) {
      try {
        await del(product.image);
      } catch (error) {
        console.error("Gagal hapus gambar di Blob (mungkin sudah hilang):", error);
      }
    }

    // 3. Hapus data di Database
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

// PUT: Update Produk & Ganti Gambar
export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const idNumber = parseInt(id);
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    
    const file = formData.get("image") as File | null;
    const oldImageUrl = formData.get("oldImage") as string | null;

    let finalImageUrl = oldImageUrl; 

    // JIKA ADA GAMBAR BARU DIUPLOAD
    if (file && file.size > 0) {
      
      // A. Hapus gambar lama dari Blob supaya storage tidak penuh
      if (oldImageUrl) {
        try {
          await del(oldImageUrl);
        } catch {
          console.log("Gambar lama tidak ditemukan di blob, skip delete.");
        }
      }

      // B. Upload gambar baru ke Blob
      const blob = await put(file.name, file, {
        access: 'public',
      });

      // C. Pakai URL baru
      finalImageUrl = blob.url;
    }

    // Update Database
    const updatedProduct = await prisma.product.update({
      where: { id: idNumber },
      data: {
        name: name,
        price: parseInt(price),
        description: description,
        image: finalImageUrl,
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