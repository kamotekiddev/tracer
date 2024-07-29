import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import type { Category, CategoryWithIssueAndProject } from "../projects";
import CreateTicketInline from "./CreateTicketInline";
import IssueCard from "./IssueCard";

interface Props {
    category: CategoryWithIssueAndProject;
    sprintId: string;
}

function CategoryCard({ category, sprintId }: Props) {
    const [showCreateTicket, setShowCreateTicket] = useState(false);

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
                            project={category.project}
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
                    <CreateTicketInline
                        show={showCreateTicket}
                        close={() => setShowCreateTicket(false)}
                        categoryId={category.id}
                        projectId={category.projectId}
                        sprintId={sprintId}
                    />
                </div>
            </div>
        </>
    );
}

export default CategoryCard;
