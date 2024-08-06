import React, { useState } from "react";
import { IssueWithProject } from "./issue.types";
import MemberSelection from "./MemberSelection";
import { User } from "@/features/interfaces/user";

interface Props {
    issue: IssueWithProject;
    members: User[];
}

function IssueAssignee({ issue, members }: Props) {
    const [assigneeId, setAssigneeId] = useState(issue.assigneeId);

    return (
        <MemberSelection
            selectedMember={assigneeId || "unassigned"}
            members={members}
            onSelectMember={setAssigneeId}
        />
    );
}

export default IssueAssignee;
