import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function apiAuthMiddleware(request: NextRequest) {
    const apiKeyEnv = process.env.NEXT_PUBLIC_API_KEY;
    const apiKeyHeader = request.headers.get("Authorization");

    if (apiKeyEnv !== apiKeyHeader) {
        return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
    }
    return NextResponse.next();
}
