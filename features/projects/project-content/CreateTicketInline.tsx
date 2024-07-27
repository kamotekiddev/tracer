import { isAxiosError } from "axios";
import { FormEvent, useState } from "react";
import { CheckIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateIssue } from "../useProjectQuery";
import TypeSelection from "./TypeSelection";
import { useToast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/features/interfaces";

interface Props {
    show: boolean;
    close: () => void;
    categoryId: string;
    sprintId: string;
    projectId: string;
}

export type IssueType = "BUG" | "TASK" | "STORY";

export interface CreateIssueRequest
    extends Pick<Props, "categoryId" | "projectId" | "sprintId"> {
    title: string;
    type: IssueType;
}

function CreateTicketInline({
    show,
    close,
    categoryId,
    sprintId,
    projectId,
}: Props) {
    const { toast } = useToast();
    const createIssue = useCreateIssue();
    const [summary, setSummary] = useState("");
    const [type, setType] = useState<IssueType>("TASK");

    const cannotProceed = !summary || !type;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (cannotProceed) return null;

        try {
            await createIssue.mutateAsync({
                title: summary,
                type: type,
                projectId,
                categoryId,
                sprintId,
            });

            toast({ title: "Task Added", description: "New task added." });

            setSummary("");
            setType("TASK");

            close();
        } catch (error) {
            if (isAxiosError<ErrorResponse>(error))
                if (typeof error.response?.data.message === "string")
                    toast({
                        title: "Create Issue Failed",
                        description:
                            error.response.data.message ||
                            "Something went wrong, Please try again later.",
                        variant: "destructive",
                    });
        }
    };

    if (!show) return null;

    return (
        <form onSubmit={handleSubmit} className="space-y-2 p-2">
            <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="What needs to be done?"
            />
            <div className="flex justify-between gap-2">
                <div className="w-max">
                    <TypeSelection
                        value={type}
                        onChange={(value) => setType(value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={close}
                    >
                        <XIcon />
                    </Button>
                    <Button size="sm" disabled={cannotProceed}>
                        <CheckIcon />
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default CreateTicketInline;
