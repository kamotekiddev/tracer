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
import { useDeleteProject } from '@/hooks/useProjects';

type DeleteModalProps = {
    idToDelete: string;
    isOpen: boolean;
    onClose: () => void;
};

function DeleteProjectModal({ idToDelete, isOpen, onClose }: DeleteModalProps) {
    const deleteProject = useDeleteProject();

    const handleClose = (open: boolean) => {
        if (!open) onClose();
    };

    const handleDeleteProject = async () => {
        if (!idToDelete) return;
        await deleteProject.mutateAsync(idToDelete);
        onClose();
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
                {deleteProject.isError && (
                    <Alert variant='destructive'>
                        <AlertDescription>
                            {deleteProject.error?.response?.data as string}
                        </AlertDescription>
                    </Alert>
                )}
                <DialogFooter>
                    <Button
                        disabled={deleteProject.isLoading}
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
