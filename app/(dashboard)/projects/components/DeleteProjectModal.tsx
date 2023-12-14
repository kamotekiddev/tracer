import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { deleteProject } from '@/lib/actions/projects.action';
import getErrorMessage from '@/lib/getErrorMessage';

type DeleteModalProps = {
    idToDelete: string;
    isOpen: boolean;
    onClose: () => void;
};

function DeleteProjectModal({ idToDelete, isOpen, onClose }: DeleteModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleClose = (open: boolean) => {
        if (!open) onClose();
    };

    const handleDeleteProject = async () => {
        if (!idToDelete) return;
        setIsDeleting(true);
        const { isSuccess, isError, error } = await deleteProject({
            id: idToDelete,
            pathToRevalidate: '/projects',
        });
        setIsDeleting(false);

        if (isSuccess) onClose();
        if (isError) setErrorMessage(getErrorMessage(error));
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                {!!errorMessage && (
                    <Alert variant='destructive'>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
                <DialogFooter>
                    <Button
                        disabled={isDeleting}
                        variant='destructive'
                        onClick={handleDeleteProject}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteProjectModal;
