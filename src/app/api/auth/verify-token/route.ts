import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { isValidEmail } from '@/libs/utils/emailValidator';
import randomNumber from '@/libs/utils/randomNumber';
import { PrismaClient } from "@prisma/client";
import { decodeToken, encodeToken } from '@/libs/utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { generateHashWithoutSalt } from "@/libs/utils/hashUtils";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


export async function POST(request: Request) {
    const { tokenDecode, tokenEncode } = await request.json();


    // Check for missing tokens
    if (!tokenDecode || !tokenEncode) {
        return NextResponse.json({ message: 'Token data missing or invalid' }, { status: 400 });
    }

    try {
        const decode = decodeToken(tokenEncode);

        // Check if decoding was unsuccessful or if verification code doesn't match
        if (!decode || typeof decode === 'string') {
            return NextResponse.json({ message: 'Invalid token format' }, { status: 400 });
        }
e
        const jwtPayload = decode as JwtPayload;

        // Check if token has expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (jwtPayload.exp && currentTime >= jwtPayload.exp) {
            return NextResponse.json({ message: 'Token has expired' }, { status: 401 });
        }
        const tokenDecodeHash = generateHashWithoutSalt(String(tokenDecode));
        // Check if verification code matches
        if (jwtPayload.verifyCode !== tokenDecodeHash) {
            return NextResponse.json({ message: 'Token verification failed' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Token successfully matched', decode }, { status: 200 });
    } catch (error) {
        console.error("Error matching token: ", error);
        return NextResponse.json({ message: 'Token processing error' }, { status: 500 });
    }
}



export async function GET(request: Request) {
    const url = new URL(request.url);
    const emailInput = url.searchParams.get('userEmail');

    if (!emailInput || !isValidEmail(emailInput)) return NextResponse.json({ message: 'Data invalid' }, { status: 400 });

    const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;
    if (!secret) {
        return NextResponse.json({ message: 'JWT secret not configured' }, { status: 500 });
    }

    const prisma = new PrismaClient();

    try {
        const user = await prisma.users.findUnique({
            where: {
                user_email: emailInput,
            },
        });
        if (!user) return NextResponse.json({ message: 'Data invalid' }, { status: 404 });

        const verifyCode = randomNumber(8);

        const verifyCodeHash = generateHashWithoutSalt(String(verifyCode));

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailInput,
            subject: 'Your Secret Code',
            html: `<h1>Your Secret Code</h1><p>Your secret code is: <b>${verifyCode}</b></p>`
        };

        const token = encodeToken({ verifyCode:verifyCodeHash, userEmail: emailInput });
        console.log("Token dari server : ",verifyCodeHash)

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'OTP sent successfully', token }, { status: 200 })
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Error send OTP" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}