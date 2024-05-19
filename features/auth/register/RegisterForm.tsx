"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import FormInput from "@/components/form-elements/FormInput";

import {
    RegisterSchema,
    RegisterSchemaType,
    defaultValues,
} from "./validation";

function RegisterForm() {
    const form = useForm<RegisterSchemaType>({
        defaultValues,
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = form.handleSubmit((values) => {
        console.log(values);
    });

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="w-full max-w-xl p-4">
                <Card className="rounded-2xl">
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
                        <Button className="w-full block">Register</Button>
                        <div className="flex items-center justify-center">
                            <span>Already have an account?</span>
                            <Link href="/register">
                                <Button
                                    variant="link"
                                    type="button"
                                    size="lg"
                                    className="w-full block font-bold px-2"
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
