'use server';

import { z } from 'zod';
import client from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { createStatusSchema } from '@/app/validationSchemas';
import getCurrentUser from '../getCurrentUser';

type CreateStatusParams = z.infer<typeof createStatusSchema> & {
    pathToRevalidate: string;
};

export const getStatusById = async (project_id: string) => {
    try {
        const user = await getCurrentUser();
        if (!user) return { isError: true, error: 'Unauthorized' };

        const boards = await client.status.findMany({ where: { project_id } });

        return { isSuccess: true, data: boards };
    } catch (error) {
        return {
            isError: true,
            error: 'Something went wrong, Please try again later.',
        };
    }
};

export const createNewStatus = async ({
    pathToRevalidate,
    ...params
}: CreateStatusParams) => {
    try {
        const validation = createStatusSchema.safeParse(params);

        if (!validation.success)
            return {
                isError: true,
                error: 'Something went wrong while validating the fields.',
            };

        const existingBoard = await client.status.findFirst({
            where: { project_id: params.project_id, name: params.name },
        });

        if (existingBoard)
            return {
                isError: true,
                error: 'Board already exist inside the project.',
            };

        const newBoard = await client.status.create({
            data: { name: params.name, project_id: params.project_id },
        });

        revalidatePath(pathToRevalidate);

        return { isSuccess: true, data: newBoard };
    } catch (error) {
        return {
            isError: true,
            error: 'Something went wrong please try again later.',
        };
    }
};
