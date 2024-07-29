"use client";

import { useParams } from "next/navigation";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useGetProject, useGetProjectBacklogs } from "../useProjectQuery";
import FullScreenLoading from "@/components/loading/FullScreenLoading";
import Issue from "./Issue";

function BacklogList() {
    const { projectId } = useParams<{ projectId: string }>();
    const { data: backlogs, ...backlogState } =
        useGetProjectBacklogs(projectId);
    const { data: project, ...projectState } = useGetProject(projectId);

    if (backlogState.isFetching || projectState.isFetching)
        return <FullScreenLoading />;

    return (
        <div className="space-y-2">
            {backlogs?.map((sprint) => (
                <Collapsible
                    key={sprint.id}
                    className="overflow-hidden rounded-lg border"
                    defaultOpen
                >
                    <CollapsibleTrigger className="w-full bg-neutral-50 p-4 text-left font-semibold data-[state=open]:bg-neutral-100">
                        Sprint {sprint.number}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="divide-y">
                        {sprint.issues.map((issue) => (
                            <Issue
                                key={issue.id}
                                issue={issue}
                                categories={project?.categories}
                                members={project?.members}
                            />
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>
    );
}

export default BacklogList;
