"use client";

import { useParams } from "next/navigation";
import { useGetProject } from "../useProjectQuery";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FullScreenLoading from "@/components/loading/FullScreenLoading";

function MembersTable() {
    const { projectId } = useParams<{ projectId: string }>();
    const { data: project, ...projectState } = useGetProject(projectId);

    if (projectState.isFetching) return <FullScreenLoading />;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {project?.members.map((member) => (
                    <TableRow key={member.id}>
                        <TableCell className="font-medium">
                            {[
                                member.firstName,
                                member.middleName,
                                member.lastName,
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell className="uppercase">
                            {project.ownerId === member.id ? (
                                <Badge>Owner</Badge>
                            ) : (
                                <Badge variant="secondary">Member</Badge>
                            )}
                        </TableCell>
                        <TableCell>
                            <Button variant="outline" size="icon">
                                <MoreHorizontalIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default MembersTable;
