import IssueTypeSelection from "@/components/IssueTypeSelection";
import { Issue } from "./issue.types";
import { useState } from "react";

interface Props {
    issue: Issue;
}

function IssueType({ issue }: Props) {
    const [type, setType] = useState(issue.type);

    return <IssueTypeSelection value={type} onChange={setType} />;
}

export default IssueType;
