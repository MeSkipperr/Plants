import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { apiAuthMiddleware } from './middleware/apiAuthMiddleware';
import { jwtAuthMiddleware } from './middleware/jwtAuthMiddleware';

export async function middleware(request: NextRequest) {
    console.log("Middleware triggered");
    const { pathname } = request.nextUrl;

    console.log("pathname:", pathname);

    if (pathname.startsWith('/api/')) {
        console.log("API Auth Middleware Active");
        return apiAuthMiddleware(request);
    }

    if (pathname === '/auth/reset-password') {
        console.log("JWT Auth Middleware Active");
        return jwtAuthMiddleware(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*', '/auth/reset-password'],
};
