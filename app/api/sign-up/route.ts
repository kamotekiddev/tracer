import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { signUpSchema } from '@/app/validationSchemas';
import client from '@/prisma/client';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const validation = signUpSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    const existingUser = await client.user.findUnique({
        where: { email: body.email },
    });

    if (existingUser)
        return NextResponse.json('email already been taken', { status: 400 });

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await client.user.create({
        data: { name: body.name, email: body.email, hashedPassword },
    });

    return NextResponse.json(newUser, { status: 201 });
}
