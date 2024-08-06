import React from "react";
import { ChevronDown } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import IssueType from "./IssueType";
import IssueAssignee from "./IssueAssignee";
import { WrapperWithLabel } from "./ViewIssueModal";
import { useGetIssueById } from "./useIssueQuery";
import IssueReporter from "./IssueReporter";
import { useGetProjectMembers } from "../useProjectQuery";

interface Props {
    issueId: string;
}

function IssueDetails({ issueId }: Props) {
    const { data: issue } = useGetIssueById(issueId);
    const { data: projectMembers } = useGetProjectMembers(
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
                <WrapperWithLabel label="Type">
                    <IssueType issue={issue} />
                </WrapperWithLabel>
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
            </CollapsibleContent>
        </Collapsible>
    );
}

export default IssueDetails;
