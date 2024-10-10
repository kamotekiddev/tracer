import React from "react";
import { useGetIssueHistory } from "../useIssueQuery";
import HistoryItem from "./HistoryItem";

interface Props {
    issueId: string;
}

function IssueHistory({ issueId }: Props) {
    const { data: issueHistory, ...issueHistoryState } =
        useGetIssueHistory(issueId);

    if (issueHistoryState.isFetching) return <p>Loading...</p>;

    return (
        <div className="divide-y">
            {issueHistory?.map((history) => (
                <HistoryItem key={history.id} issueHistory={history} />
            ))}
        </div>
    );
}

export default IssueHistory;
