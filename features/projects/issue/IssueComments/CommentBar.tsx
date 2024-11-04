import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useComment } from "../useIssueQuery";
import { isAxiosError } from "axios";
import { ErrorResponse } from "@/features/interfaces";
import { useToast } from "@/components/ui/use-toast";

interface Props {
    issueId: string;
}

function CommentBar({ issueId }: Props) {
    const comment = useComment();
    const { toast } = useToast();
    const [commentText, setCommentText] = useState<string>("");
    const [commentPhotos, setCommentPhotos] = useState<File[]>([]);

    const handleSendComment = async () => {
        try {
            if (!commentText && !commentPhotos.length) return;

            await comment.mutateAsync({
                issueId,
                photos: commentPhotos,
                text: commentText,
            });
            toast({
                title: "Comment Posted",
                description: "Your comment has been posted.",
            });
        } catch (error) {
            if (isAxiosError<ErrorResponse>(error)) {
                const { message } = error.response?.data || {};
                if (typeof message === "string")
                    return toast({
                        title: "Update Failed",
                        description: message,
                        variant: "destructive",
                    });
            }

            toast({
                title: "Update Failed",
                description: "Something went wrong, Please try again alter",
                variant: "destructive",
            });
        }
    };

    const handleSelectPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        if (!files || !files.length) return;
        for (let i = 0; i < files.length; i++)
            setCommentPhotos((prev) => [...prev, files[i]]);
    };

    return (
        <div className="space-y-2">
            <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Say something..."
            />
            <Input type="file" multiple onChange={handleSelectPhotos} />
            <Button disabled={comment.isPending} onClick={handleSendComment}>
                Send
            </Button>
        </div>
    );
}

export default CommentBar;
