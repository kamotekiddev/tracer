import { useMemo, useState } from "react";

import Select from "@/components/form-elements/select";
import { ProjectWithSprints } from "../projects.types";
import { IssueWithProject, UpdateIssueEvent } from "./issue.types";
import { useUpdateIssue } from "./useIssueQuery";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { ErrorResponse } from "@/features/interfaces";

interface Props {
    issue: IssueWithProject;
    projectWithSprints?: ProjectWithSprints;
}

function IssueSprint({ issue, projectWithSprints }: Props) {
    const { toast } = useToast();
    const [sprintId, setSprintId] = useState(issue.sprintId);
    const { sprints, key: projectKey } = projectWithSprints || {};

    const updateIssue = useUpdateIssue();

    const sprintsOptions = useMemo(() => {
        if (!sprints || !projectKey) return [];

        return sprints.map((sprint) => ({
            label: `${projectKey} Sprint ${sprint.number}`,
            value: sprint.id,
        }));
    }, [sprints, projectKey]);

    const handleChangeIssueSprint = async (newSprintId: string) => {
        try {
            setSprintId(newSprintId);
            if (newSprintId === issue.sprintId) return;

            await updateIssue.mutateAsync({
                issueId: issue.id,
                updateEvent: UpdateIssueEvent.SPRINT_CHANGE,
                sprintId: newSprintId,
            });

            toast({
                title: "Issue Updated",
                description: "The issue sprint has been updated successfully.",
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
        <Select
            value={sprintId}
            onValueChange={handleChangeIssueSprint}
            data={sprintsOptions}
        />
    );
}

export default IssueSprint;
