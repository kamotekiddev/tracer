"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormElements/FormInput";

import * as authService from "../authService";
import { LoginSchema, LoginSchemaType, defaultValues } from "./validation";
import { useToast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/features/interfaces";

interface SuccessResponse {
    accessToken: string;
    refreshToken: string;
}

function LoginForm() {
    const { toast } = useToast();

    const login = useMutation<
        AxiosResponse<SuccessResponse>,
        AxiosError<ErrorResponse>,
        LoginSchemaType
    >({
        mutationFn: (credential) => authService.login(credential),
    });

    const form = useForm<LoginSchemaType>({
        defaultValues,
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            const res = await login.mutateAsync(values);
            Cookies.set("bearer", res.data.accessToken);
            Cookies.set("refresh", res.data.refreshToken);
            window.location.reload();
        } catch (error) {
            if (isAxiosError<ErrorResponse>(error)) {
                const { message } = error.response?.data || {};
                if (Array.isArray(message))
                    return message.forEach(({ property, message }) =>
                        form.setError(property as keyof LoginSchemaType, {
                            type: "api_validation_error",
                            message,
                        })
                    );

                return toast({
                    title: "Login Failed",
                    description: message,
                    variant: "destructive",
                });
            }

            toast({
                title: "Login Failed",
                description: "Something went wrong, Please try again alter",
                variant: "destructive",
            });
        }
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
                            disabled={login.isPending}
                        />
                        <FormInput
                            label="Password"
                            control={form.control}
                            placeholder="Enter you password"
                            name="password"
                            type="password"
                            disabled={login.isPending}
                        />
                        <Button
                            className="w-full block"
                            disabled={login.isPending}
                        >
                            Sign in
                        </Button>
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
