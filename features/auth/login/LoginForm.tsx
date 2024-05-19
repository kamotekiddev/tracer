"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form-elements/FormInput";

import { LoginSchema, LoginSchemaType, defaultValues } from "./validation";

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
                <Card className="rounded-2xl">
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
                            type="password"
                        />
                        <Button className="w-full block">Sign in</Button>

                        <div className="flex items-center justify-center">
                            <span>Don&apos;t have an account?</span>
                            <Link href="/register">
                                <Button
                                    variant="link"
                                    type="button"
                                    size="lg"
                                    className="w-full block font-bold px-2"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}

export default LoginForm;
