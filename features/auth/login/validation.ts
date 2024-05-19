import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Must be valid email."),
    password: z.string().min(1, "This field is required."),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const defaultValues: LoginSchemaType = {
    email: "",
    password: "",
};
