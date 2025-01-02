import React from "react";
import { ArrowRightIcon } from "lucide-react";

import { IssueHistory, UpdateIssueEvent } from "../issue.types";

import { formatShortTimeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DiffData from "./DiffData";
import { Badge } from "@/components/ui/badge";

interface Props {
    issueHistory: IssueHistory;
}

interface UpdateInfoProps {
    updaterName: string;
    event: UpdateIssueEvent;
    updateDate: string;
}

const ActionMap: Record<UpdateIssueEvent, string> = {
    DESCRIPTION_CHANGE: "Description",
    ASSIGNEE_CHANGE: "Assignee",
    CATEGORY_CHANGE: "Status",
    SPRINT_CHANGE: "Sprint",
    SUMMARY_CHANGE: "Summary",
    TYPE_CHANGE: "Type",
};

function UpdateInfo({ event, updaterName, updateDate }: UpdateInfoProps) {
    return (
        <div>
            <div>
                <span className="font-medium">{updaterName}</span> changed the{" "}
                <span className="font-medium">{ActionMap[event]}</span>{" "}
            </div>
            <Badge variant="outline">
                {formatShortTimeAgo(new Date(updateDate))}
            </Badge>
        </div>
    );
}

function HistoryItem({ issueHistory }: Props) {
    const { event, oldData, changes, user, createdAt } = issueHistory;

    const updaterNames = [user.firstName, user.middleName, user.lastName];
    const concatenatedUpdaterName = updaterNames.filter(Boolean).join(" ");
    const updaterAcronym = updaterNames
        .map((name) => name?.charAt(0))
        .join("")
        .slice(0, 2);

    return (
        <div className="flex gap-4 p-4">
            <Avatar className="size-10">
                <AvatarImage />
                <AvatarFallback className="text-sm font-semibold">
                    {updaterAcronym}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
                <UpdateInfo
                    event={event}
                    updaterName={concatenatedUpdaterName}
                    updateDate={createdAt}
                />
                <div className="flex items-center gap-x-6">
                    <DiffData event={event} data={oldData} />
                    <ArrowRightIcon size={18} />
                    <DiffData event={event} data={changes} />
                </div>
            </div>
        </div>
    );
}

export default HistoryItem;
