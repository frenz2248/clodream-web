import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/prisma";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Cari user berdasarkan email
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    const user = rows[0];

    if (!user) {
      return NextResponse.json(
        { error: "Email tidak terdaftar!" },
        { status: 401 }
      );
    }

    // 2. Cek Password 
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Password salah!" }, { status: 401 });
    }

    // 3. Kalau sukses, kasih tiket (Cookie)
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "token-" + user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 Hari
    });

    return NextResponse.json({
      message: "Login sukses",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
