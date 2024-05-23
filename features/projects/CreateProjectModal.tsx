import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import ModalLoading from "@/components/Loading/ModalLoading";
import FormInput from "@/components/FormElements/FormInput";

import { useToast } from "@/components/ui/use-toast";
import * as projectService from "./projectService";
import { queryClient } from "@/providers/QueryProvider";
import { ErrorResponse } from "../interfaces";

const createProjectSchema = z.object({
    name: z.string().min(1, "This field is required."),
});

export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;

const defaultValues: CreateProjectSchemaType = { name: "" };

interface Props {
    open: boolean;
    onClose: () => void;
}

function CreateProjectModal({ open, onClose }: Props) {
    const { toast } = useToast();

    const createProject = useMutation<
        AxiosResponse,
        AxiosError<ErrorResponse>,
        CreateProjectSchemaType
    >({
        mutationFn: (body) => projectService.createProject(body),
    });

    const form = useForm<CreateProjectSchemaType>({
        defaultValues,
        resolver: zodResolver(createProjectSchema),
    });

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            await createProject.mutateAsync(values);
            toast({
                title: "Project Created",
                description: "A new record added.",
            });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            onClose();
        } catch (error) {
            onClose();

            if (
                isAxiosError<ErrorResponse>(error) &&
                typeof error.response?.data.message == "string"
            )
                toast({
                    title: "Creation Failed",
                    description: error.response?.data.message,
                    variant: "destructive",
                });
        }
    });

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="overflow-hidden">
                <Form {...form}>
                    <form onSubmit={onSubmit}>
                        {createProject.isPending && <ModalLoading />}
                        <DialogHeader>
                            <DialogTitle>Create Project</DialogTitle>
                        </DialogHeader>
                        <FormInput
                            name="name"
                            label="Project Name"
                            control={form.control}
                        />
                        <DialogFooter>
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button>Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateProjectModal;
