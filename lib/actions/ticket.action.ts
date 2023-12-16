'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createIssueSchema } from '@/app/validationSchemas';
import client from '@/prisma/client';
import getCurrentUser from '../getCurrentUser';

interface CreateTicketParams extends z.infer<typeof createIssueSchema> {
    pathToRevalidate: string;
}

export const createTicket = async ({
    board_id,
    content,
    title,
    project_id,
    pathToRevalidate,
}: CreateTicketParams) => {
    try {
        const user = await getCurrentUser();
        if (!user) return { isError: true, error: 'Unauthorized' };

        const validation = createIssueSchema.safeParse({
            board_id,
            content,
            title,
            project_id,
        });

        if (!validation.success)
            return {
                isError: true,
                error: 'Something went wrong while validating the fields.',
            };

        const existingTicket = await client.ticket.findFirst({
            where: { title, board_id },
        });

        if (existingTicket)
            return {
                isError: true,
                error: 'Issue already exist on the board..',
            };

        const newTicket = await client.ticket.create({
            data: {
                board_id,
                content,
                title,
                project_id,
            },
        });

        revalidatePath(pathToRevalidate);

        return { isSuccess: true, data: newTicket };
    } catch (error) {
        return {
            isError: true,
            error: 'Something went wrong, Please try again later.',
        };
    }
};
