"use client";
import { useQuery } from "@tanstack/react-query";
import * as projectService from "../projectService";
import { AxiosError } from "axios";
import { ProjectWithCompleteDetails } from "../projects";
import { ErrorResponse } from "../../interfaces";
import { Button } from "@/components/ui/button";
import { ClockIcon, EllipsisIcon } from "lucide-react";
import { QueryKeys } from "@/lib/query-keys";
import StartSprintView from "./StartSprintView";

interface Props {
    projectId: string;
}

function ProjectContent({ projectId }: Props) {
    const { data: project } = useQuery<
        ProjectWithCompleteDetails,
        AxiosError<ErrorResponse>
    >({
        queryFn: () => projectService.getProjectById(projectId),
        queryKey: [QueryKeys.PROJECTS, projectId],
    });

    if (!project?.currentSprintId) return <StartSprintView />;

    return (
        <div className="grid grid-rows-[auto_auto_1fr] gap-4 p-4">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-2xl font-semibold">
                    {project?.key} {`Sprint ${1}`}
                </h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                        <ClockIcon className="size-5" /> 3 Days
                    </div>
                    <Button size="sm" variant="secondary">
                        Complete Sprint
                    </Button>
                    <Button variant="secondary" className="size-9 p-0">
                        <EllipsisIcon className="size-5" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div>Dito Search</div>
                <div>Dito Assignee</div>
                <div>Filter by type</div>
            </div>
            <div className="flex gap-2">
                {project?.categories.map((category) => (
                    <div
                        key={category.id}
                        className="min-w-[300px] overflow-hidden rounded-lg border bg-neutral-50"
                    >
                        <div className="bg-neutral-100 p-2 font-semibold">
                            {category.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectContent;
