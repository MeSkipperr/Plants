import { decrypt, encrypt } from "@/libs/utils/crypto";
import { NextResponse } from "next/server";

export async function GET(request:Request) {   
    const url = new URL(request.url);
    const data ={
        data : {
        userEmail:"admin@admin.com",

    }, expires : `2024-11-20T02:43:02.727Z` }
    
    
    const encryptValue = encrypt(data);

    const decryptValue = decrypt("2a2c0223fc7dc3e3cd3494544614f9c6:772763c8cefdf34a21c96e0566213f7c07615fbd08a3eb9e387c608ef3dd4eff231128002a52d177fe3170f5459441e5c232eebde4a04d4fdf954995ad2c7c47a24d37b4fd3f64887677db5f769a683bae45bacb47ea3a290806b5fa5e1f28518c68a16fdb216783a10d66403d796bd0");

    const result = {
        encryptValue,
        decryptValue
    }

    return NextResponse.json(result,{status:200})
}