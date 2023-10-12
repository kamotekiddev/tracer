import { z } from 'zod';

export const createProjectSchema = z.object({
    project_name: z.string().min(2, {
        message: 'This must be at least 2 characters.',
    }),
    key: z.string().min(2, {
        message: 'This must be at least 2 characters.',
    }),
});
