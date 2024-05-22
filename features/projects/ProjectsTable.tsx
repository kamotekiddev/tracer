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

import * as projectService from "./projectService";
import { ErrorResponse } from "../interfaces";
import { Project } from "./projects";
import { Button } from "@/components/ui/button";

function ProjectsTable() {
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
        queryFn: projectService.getProjects,
        queryKey: ["projects"],
    });

    if (isFetching) return <p>Loading...</p>;
    if (isError) return <p>{error.message}</p>;

    return (
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
    );
}

export default ProjectsTable;
