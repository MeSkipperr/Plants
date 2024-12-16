import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { apiAuthMiddleware } from './middleware/apiAuthMiddleware';

export async function middleware(request: NextRequest) {
    console.log("Middleware triggered");
    const { pathname } = request.nextUrl;

    console.log("pathname:", pathname);

    // if (pathname.startsWith("/api/auth"))  return NextResponse.next();

    // Jalankan API Auth Middleware untuk semua rute di bawah /api/
    if (pathname.startsWith('/api/')) {
        console.log("API Auth Middleware Active");
        return apiAuthMiddleware(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'],
};
