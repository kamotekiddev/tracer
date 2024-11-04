import React from "react";
import { useGetIssueComments } from "../useIssueQuery";
import Comment from "./Comment";
import CommentBar from "./CommentBar";

interface Props {
    issueId: string;
}

function IssueComments({ issueId }: Props) {
    const { data: comments, ...commentsState } = useGetIssueComments(issueId);

    if (commentsState.isFetching) return <p>Loading...</p>;

    return (
        <div className="space-y-4">
            <CommentBar issueId={issueId} />
            <div className="grid gap-10">
                {comments?.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}

export default IssueComments;
