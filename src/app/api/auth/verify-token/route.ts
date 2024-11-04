import { NextResponse } from "next/server";
import { headers } from "next/headers";
import nodemailer from 'nodemailer';
import { isValidEmail } from '@/utils/emailValidator';
import randomNumber from '@/utils/randomNumber';
import { PrismaClient } from "@prisma/client";
import { decodeToken, encodeToken } from '@/utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function POST(request:Request) {
    const apiKeyEnv = process.env.NEXT_PUBLIC_API_KEY;

    const {tokenDecode,tokenEncode}  = await request.json();

    const headersList = headers();
    const apiKeyHeader = headersList.get("Authorization");

    if(apiKeyEnv !== apiKeyHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 404 });
    console.log(tokenDecode)
    console.log(tokenEncode)

    if (!tokenDecode || !tokenEncode) return NextResponse.json({ message: 'Data invalid' }, { status: 404 });

    try {
        const decode = decodeToken(tokenEncode);

        if (!decode || typeof decode === 'string' || (decode as JwtPayload).verifyCode !== tokenDecode) {
            return NextResponse.json({ message: 'Data invalid' }, { status: 400 });
        }
        return NextResponse.json({message:'Successfully match token',decode},{status:200})
    } catch (error) {
        console.error("Error match token : ", error);
        return NextResponse.json({ error: "Error Match Token" }, { status: 500 });
    }
}



export  async function GET(request:Request){
    const apiKeyEnv = process.env.NEXT_PUBLIC_API_KEY;

    const headersList = headers();
    const apiKeyHeader = headersList.get("Authorization");

    if(apiKeyEnv !== apiKeyHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 404 });

    const url = new URL(request.url);
    const emailInput = url.searchParams.get('userEmail');

    if (!emailInput || !isValidEmail(emailInput)) return NextResponse.json({ message: 'Data invalid' }, { status: 404 });

    const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;
    if (!secret) {
        return NextResponse.json({ message: 'JWT secret not configured' }, { status: 500 });
    }

        const prisma = new PrismaClient();

    try {
        const user = await prisma.users.findUnique({
            where: {
                user_email:emailInput,
            },
        });
        if(!user) return NextResponse.json({ message: 'Data invalid' }, { status: 404 });
        
        const verifyCode = randomNumber(8);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailInput,
            subject: 'Your Secret Code',
            html: `<h1>Your Secret Code</h1><p>Your secret code is: <b>${verifyCode}</b></p>`
        };

        const token = encodeToken({verifyCode,userEmail : emailInput});
        console.log(token)

        await transporter.sendMail(mailOptions);
        return NextResponse.json({message:'OTP sent successfully',token},{status:200})
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Error send OTP" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}