import { User } from "@/features/interfaces/user";
import { Issue, UpdateIssueEvent } from "../issue.types";
import { useGetIssueAssignee, useGetIssueCategory } from "../useIssueQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChangesProps {
    event: string;
    data: string;
}

interface AssigneeProps {
    user?: User;
}

function Assignee({ user }: AssigneeProps) {
    const names = [user?.firstName, user?.middleName, user?.lastName];
    const assigneeName = names.filter(Boolean).join(" ");
    const updaterAcronym = names
        .map((name) => name?.charAt(0))
        .join("")
        .slice(0, 2);

    if (!user) return <p className="text-sm">Unassigned</p>;

    return (
        <div className="flex items-center gap-4">
            <Avatar className="size-8">
                <AvatarImage />
                <AvatarFallback className="text-sm font-semibold">
                    {updaterAcronym}
                </AvatarFallback>
            </Avatar>
            <p className="text-sm">{assigneeName}</p>
        </div>
    );
}

export default function DiffData({ data, event }: ChangesProps) {
    const parsedData: Partial<Issue> = JSON.parse(data);

    const { data: assignee } = useGetIssueAssignee(parsedData?.assigneeId!);
    const { data: category } = useGetIssueCategory(parsedData?.categoryId!);

    if (event === UpdateIssueEvent.DESCRIPTION_CHANGE)
        return (
            <div className="text-sm">{parsedData.description || "Empty"}</div>
        );
    if (event === UpdateIssueEvent.SUMMARY_CHANGE)
        return <div className="text-sm">{parsedData.summary}</div>;
    if (event === UpdateIssueEvent.TYPE_CHANGE)
        return <Badge variant="secondary">{parsedData.type}</Badge>;
    if (event === UpdateIssueEvent.ASSIGNEE_CHANGE)
        return <Assignee user={assignee} />;
    if (event === UpdateIssueEvent.CATEGORY_CHANGE)
        return <Badge variant="secondary">{category?.name}</Badge>;
}
