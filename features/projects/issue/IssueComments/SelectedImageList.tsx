import React, { memo, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
    images: File[];
    onAddImage: (newImg: File) => void;
    onRemoveImage: (idx: number) => void;
}

function SelectedImageList({ images, onRemoveImage, onAddImage }: Props) {
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);
    const showAddBtn = images.length < 3;

    const handlePickImage = () => {
        hiddenInputRef.current?.click();
    };
    const handleAddNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files?.length) return;
        onAddImage(files[0]);
    };

    if (!images.length) return null;

    return (
        <div className="flex gap-4">
            {images.map((img, idx) => (
                <div key={idx} className="relative">
                    <Image
                        alt={`Selected Image ${idx}`}
                        src={URL.createObjectURL(img)}
                        width={100}
                        height={100}
                        className="size-[100px] rounded-2xl border object-contain"
                    />
                    <Button
                        onClick={() => onRemoveImage(idx)}
                        size="icon"
                        variant="destructive"
                        className="absolute right-0 top-0 size-6 rounded-full"
                    >
                        <XIcon className="size-4" />
                    </Button>
                </div>
            ))}

            {showAddBtn && (
                <>
                    <Button
                        onClick={handlePickImage}
                        size="icon"
                        className="size-[100px]"
                        variant="secondary"
                    >
                        <PlusIcon className="size-10 text-neutral-500" />
                    </Button>
                    <Input
                        type="file"
                        ref={hiddenInputRef}
                        className="hidden"
                        onChange={handleAddNewImage}
                    />
                </>
            )}
        </div>
    );
}

export default memo(SelectedImageList);
