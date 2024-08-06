import React, { useState } from "react";
import { Issue } from "./issue.types";
import MemberSelection from "./MemberSelection";
import { User } from "@/features/interfaces/user";

interface Props {
    issue: Issue;
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
