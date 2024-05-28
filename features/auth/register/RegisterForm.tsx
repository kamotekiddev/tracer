"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import FormInput from "@/components/FormElements/FormInput";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";

import {
    RegisterSchema,
    RegisterSchemaType,
    defaultValues,
} from "./validation";
import * as authService from "../authService";
import { ErrorResponse } from "@/features/interfaces";
import { useToast } from "@/components/ui/use-toast";

interface SuccessResponse {
    accessToken: string;
    refreshToken: string;
}

function RegisterForm() {
    const { toast } = useToast();

    const register = useMutation<
        AxiosResponse<SuccessResponse>,
        AxiosError<ErrorResponse>,
        RegisterSchemaType
    >({
        mutationFn: (data) => authService.register(data),
    });

    const form = useForm<RegisterSchemaType>({
        defaultValues,
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            const res = await register.mutateAsync(values);
            Cookies.set("refresh", res.data.refreshToken);
            Cookies.set("bearer", res.data.accessToken);
            window.location.reload();
        } catch (error) {
            if (isAxiosError<ErrorResponse>(error)) {
                const { message } = error.response?.data || {};

                if (Array.isArray(message))
                    return message.forEach(({ property, message }) =>
                        form.setError(property as keyof RegisterSchemaType, {
                            message,
                            type: "api_validation_error",
                        }),
                    );

                return toast({
                    title: "Registration Failed",
                    description: message,
                    variant: "destructive",
                });
            }

            return toast({
                title: "Registration Failed",
                description: "Something went wrong, Please try again later.",
                variant: "destructive",
            });
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="w-full max-w-xl p-4">
                <Card className="overflow-hidden rounded-2xl">
                    {register.isPending && <FullScreenLoading />}
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <FormLabel>Name</FormLabel>
                            <FormInput
                                control={form.control}
                                placeholder="First Name"
                                name="firstName"
                            />
                            <FormInput
                                control={form.control}
                                placeholder="Middle Name (Optional)"
                                name="middleName"
                            />
                            <FormInput
                                control={form.control}
                                placeholder="Last Name"
                                name="lastName"
                            />
                        </div>
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
                        <Button className="block w-full">Register</Button>
                        <div className="flex items-center justify-center">
                            <span>Already have an account?</span>
                            <Link href="/login">
                                <Button
                                    variant="link"
                                    type="button"
                                    size="lg"
                                    className="block w-full px-2 font-bold"
                                >
                                    Sign in
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}

export default RegisterForm;
