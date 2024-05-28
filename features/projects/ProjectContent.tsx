"use client";
import { useQuery } from "@tanstack/react-query";
import * as projectService from "./projectService";
import { AxiosError } from "axios";
import { ProjectWithCompleteDetails } from "./projects";
import { ErrorResponse } from "../interfaces";
import { Separator } from "@/components/ui/separator";

interface Props {
    projectId: string;
}

function ProjectContent({ projectId }: Props) {
    const { data: project } = useQuery<
        ProjectWithCompleteDetails,
        AxiosError<ErrorResponse>
    >({
        queryFn: () => projectService.getProjectById(projectId),
        queryKey: ["project", projectId],
    });

    return (
        <div className="grid grid-rows-[auto_auto_1fr] gap-4 p-4">
            <div className="flex items-center gap-2">
                <h1>{project?.name}</h1>
                <span>{project?.key}</span>
            </div>
            <Separator />
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
