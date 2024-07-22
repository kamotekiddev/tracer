import { useState } from "react";
import { AxiosError, isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ErrorResponse } from "@/features/interfaces";
import { queryClient } from "@/providers/QueryProvider";
import { useToast } from "@/components/ui/use-toast";

import * as projectService from "../projectService";
import { QueryKeys } from "@/lib/query-keys";
import ModalLoading from "@/components/loading/ModalLoading";

interface Props {
    sprintId: string;
}

function CompleteSprintModal({ sprintId }: Props) {
    const { toast } = useToast();
    const [openDialog, setOpenDialog] = useState(false);

    const completeSprint = useMutation<any, AxiosError, string>({
        mutationFn: (projectId) => projectService.completeSprint(projectId),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECTS] }),
    });

    const handleCompleteSprint = async () => {
        try {
            await completeSprint.mutateAsync(sprintId);
            toast({
                title: "Sprint Ended",
                description: "The sprint ended.",
            });
            setOpenDialog(false);
        } catch (error) {
            if (isAxiosError<ErrorResponse>(error)) {
                const { message } = error.response?.data || {};
                if (typeof message === "string")
                    return toast({
                        title: "Operation Failed",
                        description: message,
                        variant: "destructive",
                    });
            }

            toast({
                title: "Operation Failed",
                description: "Something went wrong, Please try again alter.",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog
            open={openDialog}
            onOpenChange={(open) => {
                if (completeSprint.isPending) return null;
                setOpenDialog(open);
            }}
        >
            <DialogTrigger asChild>
                <Button size="sm" variant="secondary">
                    Complete Sprint
                </Button>
            </DialogTrigger>
            <DialogContent>
                {completeSprint.isPending && <ModalLoading />}
                <DialogHeader>
                    <DialogTitle>Complete Sprint?</DialogTitle>
                </DialogHeader>
                <Separator />
                <div>
                    <p>Are you sure you want to complete this sprint?</p>
                </div>
                <DialogFooter>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        type="button"
                        variant="outline"
                    >
                        No
                    </Button>
                    <Button onClick={handleCompleteSprint}>Yes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CompleteSprintModal;
