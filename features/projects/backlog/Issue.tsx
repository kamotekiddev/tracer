import { BookIcon, BugIcon, CircleCheckBigIcon } from "lucide-react";

import { Category, IssueWithCategory } from "../projects.types";
import { cva } from "class-variance-authority";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User } from "@/features/interfaces/user";

interface Props {
    issue: IssueWithCategory;
    categories?: Category[];
    members?: User[];
}

const IssueIconMap = {
    TASK: <CircleCheckBigIcon size={15} />,
    BUG: <BugIcon size={15} />,
    STORY: <BookIcon size={15} />,
};

export const issueIconVariants = cva(
    "grid size-6 place-items-center rounded-sm flex-shrink-0",
    {
        variants: {
            variant: {
                TASK: "bg-primary text-primary-foreground",
                BUG: "bg-destructive text-destructive-foreground",
                STORY: "bg-green-500 text-white",
            },
        },
        defaultVariants: { variant: "TASK" },
    },
);

function Issue({ issue, categories, members }: Props) {
    const assigneeSelection = [
        { label: "Unassigned", value: "unassigned" },
        ...(members?.map((member) => ({
            label: [member.firstName, member.middleName, member.lastName]
                .filter(Boolean)
                .join(" "),
            value: member.id,
        })) || []),
    ];

    const categoriesSelection = categories?.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    return (
        <div className="grid grid-cols-[1fr_auto] items-center gap-2 p-4">
            <div className="flex items-center gap-2">
                <div className={issueIconVariants({ variant: issue.type })}>
                    {IssueIconMap[issue.type]}
                </div>
                <p>{issue.title}</p>
            </div>
            <div className="flex min-w-[400px] items-center gap-2">
                <Select value={issue.categoryId}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {categoriesSelection?.map((category) => (
                            <SelectItem
                                key={category.value}
                                value={category.value}
                            >
                                {category.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={issue.assigneeId || "unassigned"}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {assigneeSelection?.map((assignee) => (
                            <SelectItem
                                key={assignee.value}
                                value={assignee.value}
                            >
                                {assignee.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default Issue;
