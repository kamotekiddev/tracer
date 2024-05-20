"use client";

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

import * as projectService from "./projectService";
import { ErrorResponse } from "../interfaces";
import { Project } from "./projects";

function ProjectsTable() {
    const { data: projects, isFetching } = useQuery<
        AxiosResponse<Project[]>,
        AxiosError<ErrorResponse>,
        Project[]
    >({
        queryFn: projectService.getProjects,
        queryKey: ["projects"],
    });

    if (isFetching) return <p>Loading...</p>;

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
                        <TableCell className="font-medium">...</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ProjectsTable;
