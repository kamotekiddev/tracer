"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import FullScreenLoading from "@/components/loading/FullScreenLoading";
import InlineError from "@/components/errors/InlineError";
import EmptyState from "@/components/EmptyState";

import * as projectService from "./projectService";
import { type ErrorResponse } from "../interfaces";
import { type Project } from "./projects";
import CreateProjectModal from "./CreateProjectModal";
import { useState } from "react";

function ProjectsTable() {
    const params = useSearchParams();
    const filter = params.get("filter") || "ALL";
    const [createProjectModal, setCreateProjectModal] = useState(false);

    const {
        data: projects,
        isError,
        isFetching,
        error,
    } = useQuery<
        AxiosResponse<Project[]>,
        AxiosError<ErrorResponse>,
        Project[]
    >({
        queryFn: () => projectService.getProjects(filter),
        queryKey: ["projects", filter],
    });

    let content;
    if (isFetching) content = <FullScreenLoading />;
    else if (isError)
        content = (
            <InlineError
                title={error.message}
                message={error.response?.data.message as string}
            />
        );
    else if (!projects?.length)
        content = (
            <EmptyState
                title="Empty Projects"
                createText="Create Project"
                onCreate={() => setCreateProjectModal(true)}
            />
        );
    else
        content = (
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Members</TableHead>
                            <TableHead>Issues</TableHead>
                            <TableHead>Owner</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects?.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.key}</TableCell>
                                <TableCell>
                                    <Link
                                        className="font-semibold hover:underline"
                                        href={`/projects/${project.id}`}
                                    >
                                        {project.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {project?.description || "N/A"}
                                </TableCell>
                                <TableCell>{project.members}</TableCell>
                                <TableCell>{project.issues}</TableCell>
                                <TableCell>{project.owner.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );

    return (
        <>
            {content}
            <CreateProjectModal
                open={createProjectModal}
                onClose={() => setCreateProjectModal(false)}
            />
        </>
    );
}

export default ProjectsTable;
