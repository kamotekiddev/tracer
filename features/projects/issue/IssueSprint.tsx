import { useMemo, useState } from "react";

import Select from "@/components/form-elements/select";
import { ProjectWithSprints } from "../projects.types";
import { IssueWithProject } from "./issue.types";

interface Props {
    issue: IssueWithProject;
    projectWithSprints?: ProjectWithSprints;
}

function IssueSprint({ issue, projectWithSprints }: Props) {
    const [sprintId, setSprintId] = useState(issue.sprintId);
    const { sprints, key: projectKey } = projectWithSprints || {};

    const sprintsOptions = useMemo(() => {
        if (!sprints || !projectKey) return [];

        return sprints.map((sprint) => ({
            label: `${projectKey}-${sprint.number}`,
            value: sprint.id,
        }));
    }, [sprints, projectKey]);

    return (
        <Select
            value={sprintId}
            onValueChange={setSprintId}
            data={sprintsOptions}
        />
    );
}

export default IssueSprint;
