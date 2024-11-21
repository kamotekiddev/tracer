import React, { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useComment } from "../useIssueQuery";
import { isAxiosError } from "axios";
import { ErrorResponse } from "@/features/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { CameraIcon, SendIcon } from "lucide-react";
import SelectedImageList from "./SelectedImageList";

interface Props {
    issueId: string;
}

function CommentBar({ issueId }: Props) {
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);
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
        if (files.length > 3)
            return toast({
                title: "Maximum Files Exceeded!",
                description: "You cannot select more than 3 files.",
            });

        for (let i = 0; i < files.length; i++)
            setCommentPhotos((prev) => [...prev, files[i]]);
    };

    const handleOpenFilePicker = () => hiddenInputRef.current?.click();
    const handleAddImage = useCallback(
        (img: File) => setCommentPhotos((prev) => [...prev, img]),
        [],
    );
    const handleRemoveImage = useCallback(
        (idxToDelete: number) =>
            setCommentPhotos((prev) =>
                prev.filter((_, idx) => idx !== idxToDelete),
            ),
        [],
    );

    return (
        <div className="space-y-4 rounded-lg border p-4 focus-within:ring-2 focus-within:ring-primary">
            <SelectedImageList
                images={commentPhotos}
                onAddImage={handleAddImage}
                onRemoveImage={handleRemoveImage}
            />
            <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Say something..."
                className="border-transparent ring-0 focus:ring-0 focus-visible:ring-0"
            />
            <Input
                ref={hiddenInputRef}
                type="file"
                className="hidden"
                onChange={handleSelectPhotos}
                multiple
            />
            <div className="flex items-center justify-between gap-2">
                <Button
                    size="icon"
                    className="size-8 flex-shrink-0 rounded-full text-neutral-500"
                    variant="secondary"
                    onClick={handleOpenFilePicker}
                >
                    <CameraIcon size={15} />
                </Button>
                <Button
                    size="icon"
                    className="size-8 flex-shrink-0 rounded-full text-neutral-500"
                    variant="secondary"
                    disabled={comment.isPending}
                    onClick={handleSendComment}
                >
                    <SendIcon size={15} />
                </Button>
            </div>
        </div>
    );
}

export default CommentBar;
