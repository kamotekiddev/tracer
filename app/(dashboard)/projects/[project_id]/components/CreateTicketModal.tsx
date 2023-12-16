'use client';
import { z } from 'zod';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Board } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import { createTicketSchema } from '@/app/validationSchemas';
import { createTicket } from '@/lib/actions/ticket.action';
import {
    FormInput,
    FormTextAreaInput,
    FormSelectInput,
} from '@/components/form-elements';
import getErrorMessage from '@/lib/getErrorMessage';

interface CreateTicketModalProps {
    boards?: Board[];
}

function CreateTicketModal({ boards = [] }: CreateTicketModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create Ticket</Button>
            </DialogTrigger>
            <DialogContent>
                <CreateTicketForm
                    boards={boards}
                    onClose={() => setIsOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}

type CreateTicketFormFields = z.infer<typeof createTicketSchema>;

const defaultValues: CreateTicketFormFields = {
    title: '',
    board_id: '',
    content: '',
    project_id: '',
};

interface CreateIssueFormProps {
    boards: Board[];
    onClose: () => void;
}

function CreateTicketForm({ boards, onClose }: CreateIssueFormProps) {
    const { project_id } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const boardOptions = boards.map((board) => ({
        label: board.name,
        value: board.id,
    }));

    const form = useForm<CreateTicketFormFields>({
        defaultValues,
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
                        label='Issue'
                        control={form.control}
                    />
                    <FormSelectInput
                        name='board_id'
                        label='Board'
                        control={form.control}
                        data={boardOptions}
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
