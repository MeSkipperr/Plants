import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function jwtAuthMiddleware(request: NextRequest) {
    const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET as string);
    const { searchParams } = request.nextUrl;
    const token = searchParams.get('token');
    const inputToken = searchParams.get('inputToken');
    console.log("middleware")
    console.log(inputToken)

    if (!token || !inputToken) {
        return NextResponse.redirect(new URL('/auth/forget-password', request.url));
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const inputTokenHash = await generateHashWithoutSaltClient(inputToken);
        console.log("decode token adalah : ",payload);
        console.log(payload.verifyCode);
        console.log(inputTokenHash)
        if(payload.verifyCode !== inputTokenHash){
            throw new Error("Verification code does not match.");
        } 
        console.log(true)
        return NextResponse.next();
    } catch (error) {
        console.log("JWT Verify Error:", error);
        return NextResponse.redirect(new URL('/auth/forget-password', request.url));
    }
}


const generateHashWithoutSaltClient = async (input: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
};