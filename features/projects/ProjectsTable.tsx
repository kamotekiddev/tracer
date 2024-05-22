"use client";

import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { SquareArrowLeft } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import InlineError from "@/components/Errors/InlineError";
import TableSkeleton from "../../components/Loading/TableSkeleton";

import * as projectService from "./projectService";
import { type ErrorResponse } from "../interfaces";
import { type Project } from "./projects";
import { useSearchParams } from "next/navigation";

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
                        <TableHead>Name</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Issues</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects?.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell className="font-medium">
                                {project.name}
                            </TableCell>
                            <TableCell className="font-medium">
                                {project.members}
                            </TableCell>
                            <TableCell className="font-medium">
                                {project.issues}
                            </TableCell>
                            <TableCell className="font-medium">
                                {project.owner.email}
                            </TableCell>
                            <TableCell className="font-medium">
                                <Button size="icon" variant="outline">
                                    <SquareArrowLeft />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ProjectsTable;
