import React, { useState } from "react";

import { Issue } from "./issue.types";
import { User } from "@/features/interfaces/user";

import MemberSelection from "./MemberSelection";

interface Props {
    issue: Issue;
    members: User[];
}

function IssueReporter({ issue, members }: Props) {
    const [reporterId, setReporterId] = useState(issue.reporterId);

    return (
        <MemberSelection
            selectedMember={reporterId || "unassigned"}
            members={members}
            onSelectMember={setReporterId}
        />
    );
}

export default IssueReporter;
