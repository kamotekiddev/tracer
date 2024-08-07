import React from "react";
import { ChevronDown } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import IssueAssignee from "./IssueAssignee";
import { WrapperWithLabel } from "./ViewIssueModal";
import { useGetIssueById } from "./useIssueQuery";
import IssueReporter from "./IssueReporter";
import { useGetProjectMembers, useGetProjectSprints } from "../useProjectQuery";
import IssueSprint from "./IssueSprint";

interface Props {
    issueId: string;
}

function IssueDetails({ issueId }: Props) {
    const { data: issue } = useGetIssueById(issueId);
    const { data: projectMembers } = useGetProjectMembers(
        issue?.project.id || "",
    );
    const { data: projectWithSprints } = useGetProjectSprints(
        issue?.project.id || "",
    );

    if (!issue) return null;

    return (
        <Collapsible defaultOpen className="overflow-hidden rounded-lg border">
            <CollapsibleTrigger className="flex w-full items-center justify-between border-b p-4 text-left font-semibold transition data-[state=closed]:border-none data-[state=open]:bg-neutral-100 [&[data-state=open]>svg]:rotate-180">
                <span>Details</span>
                <ChevronDown className="transition" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 p-4">
                <WrapperWithLabel label="Assignee">
                    <IssueAssignee
                        issue={issue}
                        members={projectMembers || []}
                    />
                </WrapperWithLabel>
                <WrapperWithLabel label="Reporter">
                    <IssueReporter
                        issue={issue}
                        members={projectMembers || []}
                    />
                </WrapperWithLabel>
                <WrapperWithLabel label="Sprint">
                    <IssueSprint
                        issue={issue}
                        projectWithSprints={projectWithSprints}
                    />
                </WrapperWithLabel>
            </CollapsibleContent>
        </Collapsible>
    );
}

export default IssueDetails;
