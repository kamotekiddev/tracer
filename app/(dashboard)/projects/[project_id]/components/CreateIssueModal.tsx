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

import {
    FormInput,
    FormTextAreaInput,
    FormSelectInput,
} from '@/components/form-elements';
import getErrorMessage from '@/lib/getErrorMessage';
import { createIssueSchema } from '@/app/validationSchemas';
import { createTicket } from '@/lib/actions/ticket.action';

interface CreateIssueModalProps {
    boards?: Board[];
}

function CreateIssueModal({ boards = [] }: CreateIssueModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create Issue</Button>
            </DialogTrigger>
            <DialogContent>
                <CreateIssueForm
                    boards={boards}
                    onClose={() => setIsOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}

type CreateIssueFormFields = z.infer<typeof createIssueSchema>;

const defaultValues: CreateIssueFormFields = {
    title: '',
    board_id: '',
    content: '',
    project_id: '',
};

interface CreateIssueFormProps {
    boards: Board[];
    onClose: () => void;
}

function CreateIssueForm({ boards, onClose }: CreateIssueFormProps) {
    const { project_id } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const boardOptions = boards.map((board) => ({
        label: board.name,
        value: board.id,
    }));

    const form = useForm<CreateIssueFormFields>({
        defaultValues,
        resolver: zodResolver(createIssueSchema),
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

    // TODO rename board into BoardColumn at prisma model and all of its instance
    // TODO use the barrel import on all of the components who uses the form elements
    // TODO use a rich text editor on boardcolumn issue
    // TODO able to assign a issue

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <h1 className='text-2xl font-bold'>Create Issue</h1>
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

export default CreateIssueModal;
