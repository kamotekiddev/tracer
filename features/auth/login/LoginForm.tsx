"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form-elements/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const defaultValues: LoginSchemaType = {
    email: "",
    password: "",
};

function LoginForm() {
    const form = useForm<LoginSchemaType>({
        defaultValues,
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = form.handleSubmit((values) => {
        console.log(values);
    });

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="w-full max-w-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormInput
                            label="Email"
                            control={form.control}
                            placeholder="Enter your email"
                            name="email"
                        />
                        <FormInput
                            label="Password"
                            control={form.control}
                            placeholder="Enter you password"
                            name="password"
                        />
                        <Button className="w-full block mt-10">Sign in</Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}

export default LoginForm;
