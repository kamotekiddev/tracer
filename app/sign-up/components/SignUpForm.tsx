'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { isAxiosError } from 'axios';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import FormInput from '@/components/form-elements/FormInput';
import { signUpSchema } from '@/app/validationSchemas';

type SignUpFormSchema = z.infer<typeof signUpSchema>;

const defaultValues: SignUpFormSchema = {
    email: '',
    name: '',
    password: '',
    confirm_password: '',
};

function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const form = useForm<SignUpFormSchema>({
        defaultValues,
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            setIsLoading(true);
            await axios.post('/api/sign-up', values);
            form.reset(defaultValues);
            router.replace('/');
        } catch (error) {
            if (isAxiosError<string>(error))
                setErrorMessage(error.response?.data || 'An error occured!');
        } finally {
            setIsLoading(false);
        }
    });

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
                    <form onSubmit={onSubmit} className='space-y-4'>
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
                        {errorMessage && (
                            <Alert variant='destructive'>
                                <AlertTitle>An Error Occured</AlertTitle>
                                <AlertDescription>
                                    {errorMessage}
                                </AlertDescription>
                            </Alert>
                        )}
                        <Button
                            disabled={isLoading}
                            type='submit'
                            className='w-full'
                        >
                            Sign up
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}

export default SignUpForm;
