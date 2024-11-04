import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";

export async function GET(request:Request) {   
    const apiKeyEnv = process.env.NEXT_PUBLIC_API_KEY;

    const headersList = headers();
    const apiKeyHeader = headersList.get("Authorization");

    if(apiKeyEnv !== apiKeyHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 404 });

    const url = new URL(request.url);
    const userEmail = url.searchParams.get('userEmail');

    
    if(!userEmail||userEmail?.trim()==="" ) return NextResponse.json({ message: 'Data invalid' }, { status: 404 });
        
    const prisma = new PrismaClient();

    try {
        const user = await prisma.users.findUnique({
            where: {
                user_email:userEmail,
            },
        });
        if(!user) return NextResponse.json({ message: 'Data invalid' }, { status: 404 });

        return NextResponse.json(user,{status:200})
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
