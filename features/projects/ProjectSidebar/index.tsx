"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useParams } from "next/navigation";

import ProjectSidebarItem from "./ProjectSidebarItem";

import * as projectService from "../projectService";
import { AxiosError, AxiosResponse } from "axios";
import { ProjectWithCompleteDetails } from "../projects";
import { ErrorResponse } from "@/features/interfaces";
import { Separator } from "@/components/ui/separator";
import { FolderKanbanIcon } from "lucide-react";

function ProjectSidebar() {
    const pathname = usePathname();
    const { projectId } = useParams();

    const { data: project } = useQuery<
        ProjectWithCompleteDetails,
        AxiosError<ErrorResponse>
    >({
        queryFn: () => projectService.getProjectById(projectId as string),
        queryKey: ["projects", projectId],
        enabled: !!projectId,
    });

    const links = [
        { href: `/projects/${projectId}`, title: "Sprint Board" },
        { href: `/projects/${projectId}/backlog`, title: "Backlog" },
        { href: `/projects/${projectId}/members`, title: "Members" },
    ];

    return (
        <aside className="space-y-4 p-4">
            <div className="flex min-h-[50px] items-center gap-4 rounded-lg bg-neutral-50 p-2">
                <div className="grid size-[40px] place-items-center rounded-lg bg-primary text-primary-foreground">
                    <FolderKanbanIcon className="size-[20px]" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                    <h1 className="line-clamp-1 text-sm font-semibold">
                        {project?.name}
                    </h1>
                    <p className="text-xs font-medium">Software Project</p>
                </div>
            </div>
            <nav>
                {links.map((link, idx) => (
                    <ProjectSidebarItem
                        key={idx}
                        href={link.href}
                        active={pathname === link.href}
                    >
                        {link.title}
                    </ProjectSidebarItem>
                ))}
            </nav>
        </aside>
    );
}

export default ProjectSidebar;
