'use client';

import * as z from 'zod';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
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

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type SignInFormSchema = z.infer<typeof formSchema>;

const defaultValues: SignInFormSchema = {
    email: '',
    password: '',
};

function SignInForm() {
    const form = useForm<SignInFormSchema>({
        defaultValues,
        resolver: zodResolver(formSchema),
    });

    const onSubmit = () => {};
    const handleGoogleSignin = () => signIn('google', { callbackUrl: '/home' });

    return (
        <Form {...form}>
            <Card className='w-full max-w-[500px]'>
                <CardHeader>
                    <CardTitle className='font-bold'>
                        Sign in to your account
                    </CardTitle>

                    <CardDescription>
                        Don&apos;t have an account?
                        <Link
                            href='/sign-up'
                            className='text-primary font-semibold ml-2 hover:underline'
                        >
                            Sign up
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
                            name='password'
                            label='Password'
                            type='password'
                            control={form.control}
                        />
                        <Button type='submit' className='w-full'>
                            Sign In
                        </Button>
                        <Button
                            type='button'
                            onClick={handleGoogleSignin}
                            className='w-full'
                            variant='outline'
                        >
                            Continue with Google
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}

export default SignInForm;
