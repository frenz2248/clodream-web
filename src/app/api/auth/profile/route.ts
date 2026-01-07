import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, name, newPassword } = body;

    if (newPassword && newPassword.length > 0) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await db.query(
        "UPDATE users SET name = ?, password = ? WHERE email = ?",
        [name, hashedPassword, email]
      );
    } else {
      await db.query("UPDATE users SET name = ? WHERE email = ?", [
        name,
        email,
      ]);
    }

    return NextResponse.json({ message: "Profil berhasil diupdate!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal update profile", error },
      { status: 500 }
    );
  }
}
