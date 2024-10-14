import { useState } from "react";

import { IssueWithProject, UpdateIssueEvent } from "./issue.types";
import { IssueType } from "./CreateIssueInline";
import { useUpdateIssue } from "./useIssueQuery";
import IssueTypeSelection from "@/components/IssueTypeSelection";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { ErrorResponse } from "@/features/interfaces";

interface Props {
    issue: IssueWithProject;
}

function IssueTypeSelector({ issue }: Props) {
    const updateIssue = useUpdateIssue();
    const { toast } = useToast();
    const [type, setType] = useState(issue.type);

    const handleTypeChange = async (issueType: IssueType) => {
        if (type === issueType) return;
        setType(issueType);

        try {
            await updateIssue.mutateAsync({
                issueId: issue.id,
                type: issueType,
                updateEvent: UpdateIssueEvent.TYPE_CHANGE,
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

    return <IssueTypeSelection value={type} onChange={handleTypeChange} />;
}

export default IssueTypeSelector;
