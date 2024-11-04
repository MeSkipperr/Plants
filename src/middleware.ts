// middleware/authMiddleware.ts
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET as string);

    const { searchParams } = request.nextUrl;
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/auth/forget-password', request.url));
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        console.log(payload)
        
        return NextResponse.next();
    } catch (error) {
        console.log("Jwt Verify Error :" ,error)
        return NextResponse.redirect(new URL('/auth/forget-password', request.url));
    }

}

// Tentukan path middleware yang berlaku
export const config = {
    matcher: '/auth/reset-password',
};
