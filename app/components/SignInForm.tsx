'use client';

import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const form = useForm<SignInFormSchema>({
        defaultValues,
        resolver: zodResolver(formSchema),
    });

    const onSubmit = form.handleSubmit((values) => {
        setIsLoading(true);
        signIn('credentials', { ...values, redirect: false })
            .then((res) => {
                if (res?.error) setErrorMessage('Invalid username or password');
                if (res?.ok) router.replace('/home');
            })
            .catch(() => setErrorMessage('Internal server error'))
            .finally(() => setIsLoading(false));
    });

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
                    <form onSubmit={onSubmit} className='space-y-4'>
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

                        {errorMessage && (
                            <Alert variant='destructive'>
                                <AlertTitle>An Error Occured</AlertTitle>
                                <AlertDescription>
                                    {errorMessage}
                                </AlertDescription>
                            </Alert>
                        )}
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isLoading}
                        >
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
