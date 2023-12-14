'use server';

import { z } from 'zod';
import client from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { createBoardSchema } from '@/app/validationSchemas';

type CreateBoardParams = z.infer<typeof createBoardSchema> & {
    pathToRevalidate: string;
};

export const createBoard = async ({
    pathToRevalidate,
    ...params
}: CreateBoardParams) => {
    try {
        const validation = createBoardSchema.safeParse(params);

        if (!validation.success)
            return {
                isError: true,
                error: 'Something went wrong while validating the fields.',
            };

        const existingBoard = await client.board.findFirst({
            where: { project_id: params.project_id, name: params.name },
        });

        if (existingBoard)
            return {
                isError: true,
                error: 'Board already exist inside the project.',
            };

        const newBoard = await client.board.create({
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
