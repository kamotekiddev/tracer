'use server';

import { z } from 'zod';
import client from '@/prisma/client';
import { createProjectSchema } from '@/app/validationSchemas';
import getCurrentUser from '../getCurrentUser';
import { revalidatePath } from 'next/cache';

interface RevalidatePath {
    pathToRevalidate: string;
}

export const getProjects = async () => {
    try {
        const user = await getCurrentUser();

        if (!user) throw new Error('Unauthorized');

        const projects = await client.project.findMany({
            where: { user_id: user.id },
            include: {
                owner: true,
                starred_by: true,
                members: true,
                issues: true,
            },
            orderBy: { created_at: 'desc' },
        });

        return { isSuccess: true, data: projects };
    } catch (error) {
        return { isError: true, error };
    }
};

export const deleteProject = async ({
    id,
    pathToRevalidate,
}: { id: string } & RevalidatePath) => {
    try {
        const user = await getCurrentUser();
        if (!user) return { isError: true, error: 'Unauthorized' };

        const deletedProject = await client.project.delete({ where: { id } });

        revalidatePath(pathToRevalidate);

        return { isSuccess: true, data: deletedProject };
    } catch (error) {
        return { isError: true, error };
    }
};

export const createProject = async (
    params: z.infer<typeof createProjectSchema> & RevalidatePath,
) => {
    try {
        const user = await getCurrentUser();
        const validation = createProjectSchema.safeParse(params);

        if (!validation.success)
            return {
                isError: true,
                error: 'Something went wrong while validating the fields',
            };

        if (!user) return { isError: true, error: 'Unauthorized' };

        const existingProject = await client.project.findFirst({
            where: { name: params.name, key: params.key, user_id: user.id },
        });

        if (existingProject)
            return { isError: true, error: 'Project alread exist.' };

        const newProject = await client.project.create({
            data: {
                name: params.name,
                key: params.key,
                user_id: user.id,
                members: { connect: [{ id: user.id }] },
            },
        });

        revalidatePath(params.pathToRevalidate);

        return { isSuccess: true, data: newProject };
    } catch (error) {
        return { isError: true, error };
    }
};
