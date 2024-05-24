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
import InlineError from "@/components/Errors/InlineError";
import TableSkeleton from "../../components/Loading/TableSkeleton";

import * as projectService from "./projectService";
import { type ErrorResponse } from "../interfaces";
import { type Project } from "./projects";

function ProjectsTable() {
    const params = useSearchParams();
    const filter = params.get("filter") || "ALL";

    const {
        data: projects,
        isError,
        isLoading,
        error,
    } = useQuery<
        AxiosResponse<Project[]>,
        AxiosError<ErrorResponse>,
        Project[]
    >({
        queryFn: () => projectService.getProjects(filter),
        queryKey: ["projects", filter],
    });

    if (isLoading) return <TableSkeleton rows={8} columns={5} />;
    if (isError)
        return (
            <InlineError
                title={error.message}
                message={error.response?.data.message as string}
            />
        );

    return (
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
                                    className="hover:underline font-semibold"
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
}

export default ProjectsTable;
