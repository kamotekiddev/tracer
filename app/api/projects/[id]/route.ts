import { NextRequest, NextResponse } from 'next/server';
import client from '@/prisma/client';
import getCurrentUser from '@/lib/getCurrentUser';

type Params = {
    params: { id: string };
};
export async function DELETE(req: NextRequest, { params }: Params) {
    const user = await getCurrentUser();

    if (!user) return NextResponse.json('Unauthorized', { status: 401 });

    const existingProject = await client.project.findUnique({
        where: { id: params.id },
    });

    if (!existingProject)
        return NextResponse.json('Projects id doest not exist', {
            status: 400,
        });

    const deletedProject = await client.project.delete({
        where: { id: params.id },
    });

    return NextResponse.json(deletedProject);
}
