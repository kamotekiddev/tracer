import React, { useState } from "react";
import { IssueWithProject, UpdateIssueEvent } from "./issue.types";
import { useGetProjectCategories } from "../useProjectQuery";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArchiveIcon } from "lucide-react";
import { useUpdateIssue } from "./useIssueQuery";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { ErrorResponse } from "@/features/interfaces";

interface Props {
    issue: IssueWithProject;
}

function IssueCategory({ issue }: Props) {
    const [categoryId, setCategoryId] = useState(issue.categoryId);
    const { toast } = useToast();

    const updateIssue = useUpdateIssue();
    const { data: projectCategories } = useGetProjectCategories(
        issue.project.id,
    );

    const handleSelectNewCategory = async (newCategoryId: string) => {
        try {
            setCategoryId(newCategoryId);
            if (newCategoryId === issue.categoryId) return;

            await updateIssue.mutateAsync({
                issueId: issue.id,
                updateEvent: UpdateIssueEvent.CATEGORY_CHANGE,
                categoryId: newCategoryId,
            });

            toast({
                title: "Issue Updated",
                description: "Issue has been successfully updated.",
            });
        } catch (error) {
            if (isAxiosError<ErrorResponse>(error)) {
                const { message } = error.response?.data || {};
                if (typeof message === "string")
                    return toast({
                        title: "Update Failed",
                        description: message,
                        variant: "destructive",
                    });
            }

            toast({
                title: "Update Failed",
                description: "Something went wrong, Please try again alter",
                variant: "destructive",
            });
        }
    };

    return (
        <Select value={categoryId} onValueChange={handleSelectNewCategory}>
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
