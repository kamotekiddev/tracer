import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IssueWithProject } from "../projects";

interface Props {
    issue: IssueWithProject;
    onOpenIssue: (issueId: string) => void;
}

function IssueCard({ issue, onOpenIssue }: Props) {
    return (
        <article
            onClick={() => onOpenIssue(issue.id)}
            className="group/card cursor-pointer space-y-2 rounded-sm bg-white p-4 transition hover:bg-neutral-200"
        >
            <h3 className="group-hover/card:underline">{issue.title}</h3>
            <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">
                    {issue.project.key}-{issue.number}
                </span>
                <Avatar className="size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </article>
    );
}

export default IssueCard;
