import { z } from 'zod';

export const signUpSchema = z
    .object({
        email: z.string().email(),
        name: z.string().min(4),
        password: z.string().min(8).max(16),
        confirm_password: z.string().min(8).max(16),
    })
    .superRefine(({ password, confirm_password }, ctx) => {
        if (password !== confirm_password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password does not match',
                path: ['password'],
            });
            ctx.addIssue({
                code: 'custom',
                message: 'Password does not match',
                path: ['confirm_password'],
            });
        }
    });

export const createProjectSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    key: z.string().min(2, {
        message: 'Key must be at least 2 characters.',
    }),
});
