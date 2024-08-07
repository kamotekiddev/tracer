import React, { useState } from "react";
import { IssueWithProject } from "./issue.types";
import { useGetProjectCategories } from "../useProjectQuery";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArchiveIcon } from "lucide-react";

interface Props {
    issue: IssueWithProject;
}

function IssueCategory({ issue }: Props) {
    const { data: projectCategories } = useGetProjectCategories(
        issue.project.id,
    );

    const [categoryId, setCategoryId] = useState(issue.categoryId);

    return (
        <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
                <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
                {!projectCategories?.length && (
                    <div className="flex cursor-default items-center gap-2 p-4 text-neutral-400">
                        <ArchiveIcon />
                        No data to select
                    </div>
                )}
                {projectCategories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default IssueCategory;
