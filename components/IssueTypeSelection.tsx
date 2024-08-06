import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BookIcon, BugIcon, CheckSquareIcon, LucideIcon } from "lucide-react";
import { issueIconVariants } from "../features/projects/backlog/Issue";
import { IssueType } from "../features/projects/issue/CreateIssueInline";

const data: {
    label: string;
    value: IssueType;
    icon: LucideIcon;
}[] = [
    { label: "Task", value: "TASK", icon: CheckSquareIcon },
    { label: "Bug", value: "BUG", icon: BugIcon },
    { label: "Story", value: "STORY", icon: BookIcon },
];

interface Props {
    value: IssueType;
    onChange: (value: IssueType) => void;
}

function IssueTypeSelection({ value, onChange }: Props) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {data.map((d) => {
                    const SelectIcon = d.icon;

                    return (
                        <SelectItem key={d.value} value={d.value}>
                            <div className="flex items-center gap-2">
                                <div
                                    className={issueIconVariants({
                                        variant: d.value,
                                    })}
                                >
                                    <SelectIcon size={15} />
                                </div>
                                {d.label}
                            </div>
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}

export default IssueTypeSelection;
