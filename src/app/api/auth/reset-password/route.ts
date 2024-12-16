import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import hashing  from "@/libs/utils/hashing";// Assuming you have a hashing function.
import { decrypt } from "@/libs/utils/crypto";
import { isValidEmail } from "@/libs/utils/validator";

type TokenType = {
    data:{
        userEmail:string
        userToken:number
    },
    expires:string
}


export async function PATCH(request: Request) {
    const prisma = new PrismaClient();
    
    try {
        const { userEmail, newPassword ,tokenHex,tokenGuess} = await request.json();

        // Validate inputs
        if (!userEmail || typeof userEmail !== "string" || userEmail.trim() === "") {
            return NextResponse.json({ message: "Invalid email provided." }, { status: 400 });
        }

        if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters long." }, { status: 400 });
        }

        // Check for missing tokens
        if (!tokenGuess || !tokenHex) {
            return NextResponse.json({ message: 'Token data missing or invalid' }, { status: 400 });
        }

        const decrypted = decrypt(tokenHex);

        // Type guard untuk memastikan tipe adalah objek
        if (typeof decrypted !== "object" || decrypted === null) {
            throw new Error("Decrypted value is not a valid object");
        }
        const { data, expires } = decrypted as TokenType;

        if (!data.userEmail || !isValidEmail(data.userEmail ) || !data.userToken || !expires || expires.trim() === "") return NextResponse.json({ message: 'Data invalid' }, { status: 400 });
        
        if( new Date() > new Date(expires)) return NextResponse.json({massage:"Token has expires",errorCode: "TOKEN_EXPIRED"},{status:403});
        if(data.userToken !== parseInt(tokenGuess)) return NextResponse.json({message:"Invalid Token ", errorCode: "INVALID_TOKEN"}, {status:400})

        // Check if the user exists
        const user = await prisma.users.findUnique({
            where: {
                user_email: userEmail,
            },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        // Hash the new password
        const hashedPassword = await hashing(newPassword);

        // Update the user's password
        const updatedUser = await prisma.users.update({
            where: {
                user_email: userEmail,
            },
            data: {
                pass_hash: hashedPassword,
            },
        });

        return NextResponse.json({ message: "Password updated successfully.", user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error updating user password:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
