import React, { useState } from "react";

import { Issue } from "./issue.types";

import { Textarea } from "@/components/ui/textarea";

interface Props {
    issue: Issue;
}

function IssueDescription({ issue }: Props) {
    const [description, setDescription] = useState<string>(
        issue.description || "",
    );

    return (
        <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    );
}

export default IssueDescription;
