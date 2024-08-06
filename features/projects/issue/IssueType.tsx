import IssueTypeSelection from "@/components/IssueTypeSelection";
import { IssueWithProject } from "./issue.types";
import { useState } from "react";

interface Props {
    issue: IssueWithProject;
}

function IssueType({ issue }: Props) {
    const [type, setType] = useState(issue.type);

    return <IssueTypeSelection value={type} onChange={setType} />;
}

export default IssueType;
