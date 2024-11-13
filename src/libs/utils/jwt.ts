// jwt.ts
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';


export function encodeToken(payload: object, expiresIn: string = '1h'): string {
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
    
    const encode  = jwt.sign(payload, JWT_SECRET, { expiresIn });
    console.log(encode)
    return encode;
}
export function decodeToken(token: string){
        const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;

        if (!JWT_SECRET) {
            console.error('JWT secret is not defined');
            return null;
        }

    try {
        console.log('Decoding Token:', token); // Log token for debugging
        const decoded = jwt.verify(token, JWT_SECRET);  
        console.log('Decoded Payload:', decoded); // Log decoded payload
        return decoded;
    } catch (error) {
        console.error('Invalid or expired token:', error);
        return null;
    }
}

export async function decodeTokenClient(token:string){
    const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET as string);

    if (!JWT_SECRET) {
        console.error('JWT secret is not defined');
        return null;
    }

    try {
        const {payload} = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (error) {
        console.error('Invalid or expired token:', error);
        return null;
    }
}