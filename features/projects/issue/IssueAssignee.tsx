import React, { useState } from "react";

import { IssueWithProject, UpdateIssueEvent } from "./issue.types";
import { User } from "@/features/interfaces/user";
import { useUpdateIssue } from "./useIssueQuery";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { ErrorResponse } from "@/features/interfaces";
import MemberSelection from "./MemberSelection";
interface Props {
    issue: IssueWithProject;
    members: User[];
}

function IssueAssignee({ issue, members }: Props) {
    const { toast } = useToast();
    const [assigneeId, setAssigneeId] = useState(issue.assigneeId);
    const updateIssue = useUpdateIssue();

    const handleChangeNewAssignee = async (newAssigneeId: string) => {
        try {
            setAssigneeId(newAssigneeId);
            if (newAssigneeId === issue.assigneeId) return;

            await updateIssue.mutateAsync({
                issueId: issue.id,
                updateEvent: UpdateIssueEvent.ASSIGNEE_CHANGE,
                ...(newAssigneeId !== "unassigned" && {
                    assigneeId: newAssigneeId,
                }),
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
        <MemberSelection
            selectedMember={assigneeId || "unassigned"}
            members={members}
            onSelectMember={handleChangeNewAssignee}
        />
    );
}

export default IssueAssignee;
