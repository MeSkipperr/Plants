import { isValidEmail } from "@/libs/utils/emailValidator";
import { decodeToken } from "@/libs/utils/jwt";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const {token, tokenInput ,newPassword} = await request.json();

    if(!token ||  !isValidEmail(userEmail) || newPassword.length < 8 || !/\d/.test(newPassword)){
        return NextResponse.json({ message: 'Data invalid' }, { status: 404 }); 
    }

    const  {userEmail} = decodeToken(token);


}