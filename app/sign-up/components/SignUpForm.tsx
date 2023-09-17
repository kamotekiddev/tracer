'use client';

import * as z from 'zod';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import FormInput from '@/components/form-elements/FormInput';

const formSchema = z
    .object({
        email: z.string().email(),
        name: z.string().min(4),
        password: z.string().min(8),
        confirm_password: z.string().min(8),
    })
    .superRefine(({ confirm_password, password }, ctx) => {
        if (password !== confirm_password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password must match.',
                path: ['confirm_password'],
            });
            ctx.addIssue({
                code: 'custom',
                message: 'Password must match.',
                path: ['password'],
            });
        }
    });

type SignUpFormSchema = z.infer<typeof formSchema>;

const defaultValues: SignUpFormSchema = {
    email: '',
    name: '',
    password: '',
    confirm_password: '',
};

function SignUpForm() {
    const form = useForm<SignUpFormSchema>({
        defaultValues,
        resolver: zodResolver(formSchema),
    });

    const onSubmit = () => {};

    return (
        <Form {...form}>
            <Card className='w-full max-w-[500px]'>
                <CardHeader>
                    <CardTitle className='font-bold'>
                        Create your account
                    </CardTitle>
                    <CardDescription>
                        Already have an account?
                        <Link
                            href='/'
                            className='text-primary ml-2 font-semibold hover:underline'
                        >
                            Sign In
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormInput
                            name='email'
                            label='Email'
                            control={form.control}
                        />
                        <FormInput
                            name='name'
                            label='Name'
                            control={form.control}
                        />
                        <FormInput
                            name='password'
                            label='Password'
                            type='password'
                            control={form.control}
                        />
                        <FormInput
                            name='confirm_password'
                            label='Confirm Password'
                            type='password'
                            control={form.control}
                        />
                        <Button type='submit' className='w-full'>
                            Sign up
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}

export default SignUpForm;
