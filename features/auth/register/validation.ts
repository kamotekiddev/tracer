import * as z from "zod";

export const RegisterSchema = z.object({
    firstName: z.string().min(1, "This field is required."),
    middleName: z.string(),
    lastName: z.string().min(1, "This field is required."),
    email: z.string().email("Must be valid email."),
    password: z.string().min(1, "This field is required."),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const defaultValues: RegisterSchemaType = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
};
