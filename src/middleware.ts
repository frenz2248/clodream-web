import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil cookie 'admin_token'
  const token = request.cookies.get('admin_token');

  // Jika user mau masuk ke halaman /admin ...
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // ... tapi tidak punya token (belum login)
    if (!token) {
      // Tendang balik ke halaman Login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Tentukan halaman mana saja yang dijaga Satpam
export const config = {
  matcher: ['/admin/:path*'], // Semua halaman yang berawalan /admin
};