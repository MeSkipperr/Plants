import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { isValidEmail } from '@/libs/utils/validator';
import randomNumber from '@/libs/utils/randomNumber';
import { PrismaClient } from "@prisma/client";
import { decrypt, encrypt } from "@/libs/utils/crypto";
import { getEmailTemplate } from "@/libs/email/tamplates/sendToken";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

type TokenType = {
    data:{
        userEmail:string
        userToken:number
    },
    expires:string
}

export async function POST(request: Request) {
    const { tokenGuess, tokenHex } = await request.json();


    // Check for missing tokens
    if (!tokenGuess || !tokenHex) {
        return NextResponse.json({ message: 'Token data missing or invalid' }, { status: 400 });
    }

    try {
        const decrypted = decrypt(tokenHex);

        // Type guard untuk memastikan tipe adalah objek
        if (typeof decrypted !== "object" || decrypted === null) {
            throw new Error("Decrypted value is not a valid object");
        }
        const { data, expires } = decrypted as TokenType;

        if (!data.userEmail || !isValidEmail(data.userEmail ) || !data.userToken || !expires || expires.trim() === "") return NextResponse.json({ message: 'Data invalid' }, { status: 400 });
        
        if( new Date() > new Date(expires)) return NextResponse.json({massage:"Token has expires",errorCode: "TOKEN_EXPIRED"},{status:403});
        if(data.userToken !== parseInt(tokenGuess)) return NextResponse.json({message:"Invalid Token ", errorCode: "INVALID_TOKEN"}, {status:400})
        
        return NextResponse.json({ message: 'Token successfully matched', decrypted }, { status: 200 });
    } catch (error) {
        console.error("Error matching token: ", error);
        return NextResponse.json({ message: 'Token processing error' }, { status: 500 });
    }
}



export async function GET(request: Request) {
    const url = new URL(request.url);
    const emailInput = url.searchParams.get('userEmail');
    const sendMethod = url.searchParams.get('method');
    const nextPage = url.searchParams.get('nextPage') || "";

    const sendMathodValue = ["number","link"]

    if (!emailInput || !isValidEmail(emailInput) || !sendMethod || !sendMathodValue.includes(sendMethod)) return NextResponse.json({ message: 'Data invalid' }, { status: 400 });

    const prisma = new PrismaClient();

    try {
        const user = await prisma.users.findUnique({
            where: {
                user_email: emailInput,
            },
        });
        if (!user) return NextResponse.json({ message: 'Data invalid' }, { status: 404 });

        const verifyCode = randomNumber(8);

        
        const dataToken = {
            data: {
                userEmail: emailInput,
                userToken: verifyCode
            },
            expires: new Date(new Date().getTime() + 30 * 60 * 1000)    
        }

        const tokenEncrypt = encrypt(dataToken)
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailInput,
            subject: 'Token Reset Password',
            html: getEmailTemplate({ sendMethod, verifyCode ,nextPage,token : tokenEncrypt})
        };
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'OTP sent successfully',tokenEncrypt }, { status: 200 })
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Error send OTP" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}