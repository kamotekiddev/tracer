import { useForm } from "react-hook-form";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    FormInput,
    FormSelectInput,
    FormTextAreaInput,
} from "@/components/form-elements";
import { useState } from "react";

const createTicketSchema = z.object({
    title: z.string(),
    status: z.string(),
    description: z.string(),
    assignee: z.string(),
    type: z.string(),
    sprint: z.string(),
    project: z.string(),
});

type CreateTicketSchemaType = z.infer<typeof createTicketSchema>;

function CreateTicketModal() {
    const [openDialog, setOpenDialog] = useState(false);
    const form = useForm<CreateTicketSchemaType>({
        defaultValues: { description: "", status: "", title: "" },
    });

    const onSubmit = form.handleSubmit((values) => {
        console.log(values);
    });

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger className="w-full bg-neutral-200 p-2 text-sm font-semibold">
                        Create Issue
                    </DialogTrigger>
                    <DialogContent className="grid max-h-[700px] w-full max-w-[700px] grid-rows-[auto_1fr_auto] p-0">
                        <DialogHeader className="p-4 pb-0">
                            <DialogTitle>New Task</DialogTitle>
                        </DialogHeader>
                        <div className="scrollbar-hide space-y-2 overflow-auto p-4">
                            <FormSelectInput
                                label="Status"
                                name="status"
                                control={form.control}
                                data={[]}
                                required
                            />
                            <FormInput
                                name="title"
                                label="Summary"
                                control={form.control}
                                required
                            />
                            <FormTextAreaInput
                                name="description"
                                label="Description"
                                control={form.control}
                                required
                            />
                            <FormSelectInput
                                label="Assignee"
                                name="assignee"
                                control={form.control}
                                data={[]}
                                required
                            />
                            <FormSelectInput
                                label="Type"
                                name="type"
                                control={form.control}
                                data={[]}
                                required
                            />
                            <FormSelectInput
                                label="Sprint"
                                name="sprint"
                                control={form.control}
                                data={[]}
                                required
                            />
                            <FormSelectInput
                                label="Project"
                                name="project"
                                control={form.control}
                                data={[]}
                                required
                            />
                        </div>
                        <DialogFooter className="p-4 pt-0">
                            <Button
                                variant="outline"
                                onClick={() => setOpenDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button>Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </form>
        </Form>
    );
}

export default CreateTicketModal;
