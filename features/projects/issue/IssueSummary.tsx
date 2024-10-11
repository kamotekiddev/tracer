import { useState } from "react";
import { isAxiosError } from "axios";
import { CheckIcon, XIcon } from "lucide-react";

import { Issue, UpdateIssueEvent } from "./issue.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateIssue } from "./useIssueQuery";
import { useToast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/features/interfaces";

interface Props {
    issue: Issue;
}

function IssueSummary({ issue }: Props) {
    const { toast } = useToast();
    const updateIssue = useUpdateIssue();
    const [showEditor, setShowEditor] = useState(false);
    const [summary, setSummary] = useState(issue.summary);

    const handleUpdateIssueSummary = async () => {
        if (summary.trim() === issue.summary) return setShowEditor(false);

        try {
            await updateIssue.mutateAsync({
                issueId: issue.id,
                summary,
                updateEvent: UpdateIssueEvent.SUMMARY_CHANGE,
            });
            toast({
                title: "Summary Updated",
                description: "Summary has been successfully updated.",
            });
            setShowEditor(false);
        } catch (error) {
            if (isAxiosError<ErrorResponse>(error)) {
                const { message } = error.response?.data || {};
                if (typeof message === "string")
                    return toast({
                        title: "Update Failed",
                        description: message,
                        variant: "destructive",
                    });
            }

            toast({
                title: "Update Failed",
                description: "Something went wrong, Please try again alter",
                variant: "destructive",
            });
        }
    };

    if (!showEditor)
        return (
            <h1
                className="py-2 text-xl hover:bg-neutral-100"
                onClick={() => setShowEditor(true)}
            >
                {summary}
            </h1>
        );

    return (
        <div className="space-y-2">
            <Input
                autoFocus
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="text-xl"
            />
            <div className="flex justify-end gap-x-2">
                <Button
                    variant="secondary"
                    className="size-8 p-0"
                    onClick={() => setShowEditor(false)}
                >
                    <XIcon className="size-4" />
                </Button>
                <Button
                    className="size-8 p-0"
                    onClick={handleUpdateIssueSummary}
                >
                    <CheckIcon className="size-4" />
                </Button>
            </div>
        </div>
    );
}

export default IssueSummary;
