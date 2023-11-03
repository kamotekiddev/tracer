import { NextResponse } from 'next/server';
import client from '@/prisma/client';
import getCurrentUser from '@/lib/getCurrentUser';

export async function GET() {
    const user = await getCurrentUser();

    if (!user) return NextResponse.json('Unauthorized', { status: 401 });

    const projects = await client.project.findMany({
        where: { user_id: user.id },
        include: { owner: true, starred_by: true, members: true },
        orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(projects);
}
