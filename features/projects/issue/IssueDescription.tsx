import React, { useState } from "react";

import { Issue, UpdateIssueEvent } from "./issue.types";

import { Textarea } from "@/components/ui/textarea";
import { useUpdateIssue } from "./useIssueQuery";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { ErrorResponse } from "@/features/interfaces";

interface Props {
    issue: Issue;
}

function IssueDescription({ issue }: Props) {
    const { toast } = useToast();
    const updateIssue = useUpdateIssue();
    const [description, setDescription] = useState<string>(
        issue.description || "",
    );

    const handleUpdateDescription = async () => {
        try {
            if (description === issue.description)
                return setDescription(issue.description);

            await updateIssue.mutateAsync({
                issueId: issue.id,
                description: description,
                updateEvent: UpdateIssueEvent.DESCRIPTION_CHANGE,
            });

            toast({
                title: "Issue Updated",
                description: "Issue has been successfully updated.",
            });
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

    return (
        <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleUpdateDescription}
        />
    );
}

export default IssueDescription;
