import { NextRequest, NextResponse } from 'next/server';
import client from '@/prisma/client';
import getCurrentUser from '@/lib/getCurrentUser';
import { createProjectSchema } from '@/app/validationSchemas';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const user = await getCurrentUser();

    const validation = createProjectSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    if (!user) return NextResponse.json('Unauthorized', { status: 401 });

    const existingProject = await client.project.findFirst({
        where: { name: body.name, key: body.key, user_id: user.id },
    });

    if (existingProject)
        return NextResponse.json('project name already been taken', {
            status: 400,
        });

    const newProject = await client.project.create({
        data: {
            name: body.name,
            key: body.key,
            user_id: user.id,
            members: { connect: [{ id: user.id }] },
        },
    });

    return NextResponse.json(newProject);
}
