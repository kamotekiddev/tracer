import * as z from "zod";

import { useState } from "react";
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

import * as projectService from "../projectService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { AxiosError, isAxiosError } from "axios";
import { useParams } from "next/navigation";
import FormDateInput from "@/components/form-elements/FormDateInput";
import { ErrorResponse } from "@/features/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "@/providers/QueryProvider";
import { QueryKeys } from "@/lib/query-keys";

const createSprintSchema = z.object({
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
});

export type CreateSprintSchemaType = z.infer<typeof createSprintSchema>;

const defaultValues: CreateSprintSchemaType = {
    startDate: null,
    endDate: null,
};

export interface CreateSprintRequest extends CreateSprintSchemaType {
    projectId: string;
}

function CreateSprintModal() {
    const { toast } = useToast();
    const [openDialog, setOpenDialog] = useState(false);
    const { projectId } = useParams<Pick<CreateSprintRequest, "projectId">>();

    const createSprint = useMutation<any, AxiosError, CreateSprintRequest>({
        mutationFn: (data) => projectService.createSprint(data),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECTS] }),
    });

    const form = useForm<CreateSprintSchemaType>({
        defaultValues,
        resolver: zodResolver(createSprintSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            await createSprint.mutateAsync({ projectId, ...values });
            toast({
                title: "Sprint Started",
                description: "A new sprint has started.",
            });
            setOpenDialog(false);
        } catch (error) {
            if (isAxiosError<ErrorResponse>(error)) {
                const { message } = error.response?.data || {};
                if (Array.isArray(message))
                    return message.forEach(({ property, message }) =>
                        form.setError(
                            property as keyof CreateSprintSchemaType,
                            {
                                type: "api_validation_error",
                                message,
                            },
                        ),
                    );

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
    });

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button>Start Sprint</Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Create Sprint</DialogTitle>
                        </DialogHeader>
                        <Separator />
                        <FormDateInput
                            label="Start Date"
                            name="startDate"
                            control={form.control}
                        />
                        <FormDateInput
                            label="End Date"
                            name="endDate"
                            control={form.control}
                        />
                        <DialogFooter>
                            <Button
                                onClick={() => setOpenDialog(false)}
                                type="button"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button>Create Sprint</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateSprintModal;
