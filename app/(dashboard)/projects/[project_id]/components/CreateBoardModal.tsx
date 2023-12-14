'use client';
import { z } from 'zod';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { createStatusSchema } from '@/app/validationSchemas';
import { createStatus } from '@/lib/actions/status.action';
import getErrorMessage from '@/lib/getErrorMessage';
import FormInput from '@/components/form-elements/FormInput';

function CreateBoardModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <div className='p-6 bg-indigo-600 text-white h-full text-lg font-medium grid place-items-center gap-2 w-max rounded-lg'>
                    <div className='grid place-items-center'>
                        <PlusIcon className='h-[50px] w-[50px]' />
                        Create Board
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <CreateBoardForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

type CreateBoardFormFields = z.infer<typeof createStatusSchema>;
const defaultValues: CreateBoardFormFields = { project_id: '', status: '' };

interface CreateBoardFormProps {
    onSuccess: () => void;
}
function CreateBoardForm({ onSuccess }: CreateBoardFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { project_id } = useParams();

    const form = useForm<CreateBoardFormFields>({
        defaultValues: {
            ...defaultValues,
            project_id: project_id as string,
        },
        resolver: zodResolver(createStatusSchema),
    });

    const handleSubmit = form.handleSubmit(async (values) => {
        setIsLoading(true);
        const { isSuccess, isError, error } = await createStatus(values);
        setIsLoading(false);

        if (isSuccess) onSuccess();
        if (isError) setErrorMessage(getErrorMessage(error));
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <h1 className='text-2xl font-semibold'>Create Board</h1>
                    <p className='text-gray-500 text-sm'>
                        create your board to group the issue
                    </p>
                </div>
                <div className='space-y-4'>
                    <FormInput
                        control={form.control}
                        name='status'
                        label='Board Name'
                    />
                </div>
                {errorMessage && (
                    <Alert variant='destructive'>
                        <AlertTitle>An Error Occured</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
                <div className='flex justify-end'>
                    <Button disabled={isLoading}>Create</Button>
                </div>
            </form>
        </Form>
    );
}

export default CreateBoardModal;
