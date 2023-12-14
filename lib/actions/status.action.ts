'use server';

import { z } from 'zod';
import client from '@/prisma/client';
import { createStatusSchema } from '@/app/validationSchemas';

type CreateStatusParams = z.infer<typeof createStatusSchema>;

export const createStatus = async (params: CreateStatusParams) => {
    try {
        const validation = createStatusSchema.safeParse(params);

        if (!validation.success)
            return {
                isError: true,
                error: 'Something went wrong while validating the fields.',
            };

        const existingStatus = await client.status.findFirst({
            where: { project_id: params.project_id, status: params.status },
        });

        if (existingStatus)
            return {
                isError: true,
                error: 'Status already exist inside the project.',
            };

        const newStatus = await client.status.create({
            data: { status: params.status, project_id: params.project_id },
        });

        return { isSuccess: true, data: newStatus };
    } catch (error) {
        return {
            isError: true,
            error: 'Something went wrong please try again later.',
        };
    }
};
