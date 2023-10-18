'use client';

import * as z from 'zod';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, buttonVariants } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/form-elements/FormInput';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { createProjectSchema } from '@/app/validationSchemas';

type CreateProjectForm = z.infer<typeof createProjectSchema>;

const defaultValues: CreateProjectForm = {
    name: '',
    key: '',
};

function CreateProjectForm() {
    const form = useForm<CreateProjectForm>({
        defaultValues,
        resolver: zodResolver(createProjectSchema),
    });

    const onSubmit = () => {};

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
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
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
                        <div className='flex gap-4 justify-end'>
                            <Link
                                href='/projects'
                                className={buttonVariants({
                                    variant: 'outline',
                                })}
                            >
                                Cancel
                            </Link>
                            <Button type='submit'>Create Project</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}

export default CreateProjectForm;
