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

import ModalLoading from "@/components/loading/ModalLoading";
import FormInput from "@/components/form-elements/FormInput";

import { useToast } from "@/components/ui/use-toast";
import * as projectService from "./projectService";
import { queryClient } from "@/providers/QueryProvider";
import { ErrorResponse } from "../interfaces";
import { Separator } from "@/components/ui/separator";
import FormTextAreaInput from "@/components/form-elements/FormTextAreInput";
import { useCallback, useEffect } from "react";
import { ALPHA } from "../regex";

const createProjectSchema = z.object({
    name: z.string().min(5, "This field is required."),
    key: z.string().min(3, "This field is required."),
    description: z.string(),
});

export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;

const defaultValues: CreateProjectSchemaType = {
    name: "",
    key: "",
    description: "",
};

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

    const projectName = form.watch("name");

    const generateProjectKey = useCallback(() => {
        let key = "";
        if (!projectName) return null;

        const splittedString = projectName.split(" ");

        if (splittedString.length >= 3)
            key = splittedString.map((str) => str[0]).join("");
        else key = projectName.substring(0, 3);

        return form.setValue("key", key);
    }, [projectName, form]);

    useEffect(() => {
        generateProjectKey();
    }, [generateProjectKey]);

    const handleClose = () => {
        if (createProject.isPending) return null;
        form.reset(defaultValues);
        onClose();
    };

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            await createProject.mutateAsync(values);
            toast({
                title: "Project Created",
                description: "A new record added.",
            });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            handleClose();
        } catch (error) {
            if (isAxiosError<ErrorResponse>(error)) {
                if (Array.isArray(error.response?.data.message))
                    return error.response?.data.message.forEach(
                        ({ property, message }) =>
                            form.setError(
                                property as keyof CreateProjectSchemaType,
                                {
                                    type: "api_validation_error",
                                    message,
                                },
                            ),
                    );

                return toast({
                    title: "Creation Failed",
                    description: error.response?.data.message,
                    variant: "destructive",
                });
            }
        }
    });

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="overflow-hidden">
                {createProject.isPending && <ModalLoading />}
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Create Project</DialogTitle>
                        </DialogHeader>
                        <Separator />
                        <FormInput
                            name="name"
                            label="Project Name"
                            control={form.control}
                            required
                            formatValue={(value) =>
                                value.replace(ALPHA, "").toUpperCase()
                            }
                        />
                        <FormInput
                            name="key"
                            label="Key"
                            control={form.control}
                            required
                            formatValue={(value) =>
                                value.replace(ALPHA, "").toUpperCase()
                            }
                        />
                        <FormTextAreaInput
                            name="description"
                            label="Description"
                            control={form.control}
                        />
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
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
