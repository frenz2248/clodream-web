import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, name, newPassword } = body;

    if (newPassword && newPassword.length > 0) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { email },
        data: { name, password: hashedPassword },
      });
    } else {
      await prisma.user.update({
        where: { email },
        data: { name },
      });
    }

    return NextResponse.json({ message: "Profil berhasil diupdate!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal update profile", error },
      { status: 500 }
    );
  }
}
