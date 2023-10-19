'use client';

import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { isAxiosError } from 'axios';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, buttonVariants } from '@/components/ui/button';
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
import { createProjectSchema } from '@/app/validationSchemas';
import FormInput from '@/components/form-elements/FormInput';

type CreateProjectForm = z.infer<typeof createProjectSchema>;

const defaultValues: CreateProjectForm = {
    name: '',
    key: '',
};

function CreateProjectForm() {
    const router = useRouter();
    const [isLoading, setIsloading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const form = useForm<CreateProjectForm>({
        defaultValues,
        resolver: zodResolver(createProjectSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            setIsloading(true);
            await axios.post('/api/projects/new', values);
            form.reset(defaultValues);
            router.replace('/projects');
        } catch (error) {
            if (isAxiosError<string>(error))
                setErrorMessage(
                    error.response?.data || 'Internal server error',
                );
        } finally {
            setIsloading(false);
        }
    });

    return (
        <Form {...form}>
            <Card>
                <CardHeader>
                    <CardTitle className='font-black'>New Project</CardTitle>
                    <CardDescription>
                        Explore what&apos;s possible when you collaborate with
                        your team. Edit project details anytime in project
                        settings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className='space-y-4'>
                        <FormInput
                            label='Project Name'
                            control={form.control}
                            name='name'
                        />
                        <FormInput
                            label='Key'
                            control={form.control}
                            name='key'
                            description='Add acronym of your project name ex. SSWI'
                        />
                        {errorMessage && (
                            <Alert variant='destructive'>
                                <AlertTitle>An Error Occured</AlertTitle>
                                <AlertDescription>
                                    {errorMessage}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className='flex gap-4 justify-end'>
                            <Link
                                href='/projects'
                                className={buttonVariants({
                                    variant: 'outline',
                                })}
                            >
                                Cancel
                            </Link>
                            <Button type='submit' disabled={isLoading}>
                                Create Project
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}

export default CreateProjectForm;
