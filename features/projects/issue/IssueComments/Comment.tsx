import Image from "next/image";

import { IssueComment } from "../issue.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatShortTimeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props {
    comment: IssueComment;
}

interface AuthorProps {
    author: IssueComment["author"];
    commentTime: string;
}

function Author({ author, commentTime }: AuthorProps) {
    const { firstName, middleName, lastName } = author;

    const authorName = [firstName, middleName, lastName]
        .filter(Boolean)
        .join(" ");

    const authorAcronym =
        `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    const timeOfComment = formatShortTimeAgo(new Date(commentTime));

    return (
        <div className="flex gap-4">
            <Avatar className="size-10">
                <AvatarImage />
                <AvatarFallback className="text-sm font-semibold">
                    {authorAcronym}
                </AvatarFallback>
            </Avatar>
            <div>
                <p className="font-medium">{authorName}</p>
                <Badge variant="outline">{timeOfComment}</Badge>
            </div>
        </div>
    );
}

function Comment({ comment }: Props) {
    const { photos, author, createdAt } = comment;

    return (
        <div className="space-y-4">
            <Author author={author} commentTime={createdAt} />
            <div className="flex gap-2">
                {photos.map((photo) => (
                    <Image
                        key={photo}
                        src={photo}
                        width={100}
                        height={100}
                        alt="Comment Photo"
                        className="rounded-lg border object-contain"
                    />
                ))}
            </div>
            <p className="text-sm">{comment.text}</p>
        </div>
    );
}

export default Comment;
