import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import type { CategoryWithIssue } from "../projects.types";
import CreateIssueInline from "../issue/CreateIssueInline";
import IssueCard from "../issue/IssueCard";
import ViewIssueModal from "../issue/ViewIssueModal";

interface Props {
    category: CategoryWithIssue;
    sprintId: string;
}

function CategoryCard({ category, sprintId }: Props) {
    const [showCreateTicket, setShowCreateTicket] = useState(false);
    const [issueId, setIssueId] = useState("");

    return (
        <>
            <div className="grid min-w-[300px] grid-rows-[auto_1fr] overflow-hidden rounded-lg border bg-neutral-50">
                <div className="flex items-center justify-between gap-4 bg-neutral-100 p-2 font-semibold">
                    <h1>{category.name}</h1>
                    <MoreHorizontalIcon />
                </div>
                <div className="group space-y-1 p-1">
                    {category.issues.map((issue) => (
                        <IssueCard
                            key={issue.id}
                            issue={issue}
                            onOpenIssue={setIssueId}
                        />
                    ))}

                    {!showCreateTicket && (
                        <button
                            onClick={() => setShowCreateTicket((prev) => !prev)}
                            className="invisible w-full rounded-sm bg-neutral-200 p-2 text-sm font-semibold group-hover:visible"
                        >
                            Create Issue
                        </button>
                    )}
                    <CreateIssueInline
                        show={showCreateTicket}
                        close={() => setShowCreateTicket(false)}
                        categoryId={category.id}
                        projectId={category.projectId}
                        sprintId={sprintId}
                    />
                </div>
            </div>
            <ViewIssueModal
                open={!!issueId}
                issueId={issueId}
                onClose={() => setIssueId("")}
            />
        </>
    );
}

export default CategoryCard;
