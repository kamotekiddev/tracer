'use client';
import { z } from 'zod';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Status } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import { createTicketSchema } from '@/app/validationSchemas';
import { createTicket } from '@/lib/actions/ticket.action';
import getErrorMessage from '@/lib/getErrorMessage';
import {
    FormInput,
    FormTextAreaInput,
    FormSelectInput,
} from '@/components/form-elements';

interface CreateTicketModalProps {
    statuses?: Status[];
}

function CreateTicketModal({ statuses = [] }: CreateTicketModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create Ticket</Button>
            </DialogTrigger>
            <DialogContent>
                <CreateTicketForm
                    statuses={statuses}
                    onClose={() => setIsOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}

type CreateTicketFormFields = z.infer<typeof createTicketSchema>;

const defaultValues: CreateTicketFormFields = {
    title: '',
    status_id: '',
    content: '',
    type: 'issue',
    project_id: '',
};

interface CreateIssueFormProps {
    statuses: Status[];
    onClose: () => void;
}

function CreateTicketForm({ statuses, onClose }: CreateIssueFormProps) {
    const { project_id } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const statusOptions = statuses.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const form = useForm<CreateTicketFormFields>({
        defaultValues: { ...defaultValues, status_id: statusOptions[0].value },
        resolver: zodResolver(createTicketSchema),
    });

    const handleSubmit = form.handleSubmit(async (values) => {
        setIsLoading(true);
        const { isError, isSuccess, error } = await createTicket({
            ...values,
            project_id: project_id as string,
            pathToRevalidate: '/projects/[project_id]',
        });

        setIsLoading(false);

        if (isSuccess) onClose();
        if (isError) setErrorMessage(getErrorMessage(error));
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <h1 className='text-2xl font-bold'>Create Ticket</h1>
                </div>
                <div>
                    <FormInput
                        name='title'
                        label='Title'
                        control={form.control}
                    />
                    <FormSelectInput
                        name='type'
                        label='Type'
                        control={form.control}
                        data={[
                            { label: 'Issue', value: 'issue' },
                            { label: 'Bug', value: 'bug' },
                            { label: 'Task', value: 'task' },
                        ]}
                    />
                    <FormSelectInput
                        name='status_id'
                        label='Status'
                        control={form.control}
                        data={statusOptions}
                    />
                    <FormTextAreaInput
                        control={form.control}
                        name='content'
                        label='Content'
                    />
                </div>
                {errorMessage && (
                    <Alert variant='destructive'>
                        <AlertTitle>An Error Occured</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
                <div className='flex justify-end'>
                    <Button type='submit' disabled={isLoading}>
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default CreateTicketModal;
