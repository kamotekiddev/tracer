import { useState } from "react";
import { CheckIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";

interface Props extends InputProps {
    onSave: () => void;
}

function IssueInput({ onSave, ...props }: Props) {
    const [showButtons, setShowButtons] = useState(false);

    return (
        <div className="space-y-2">
            <Input
                {...props}
                className="cursor-text border-none px-0 text-xl transition focus:px-2"
                onFocus={() => setShowButtons(true)}
            />
            {showButtons && (
                <div className="flex justify-end gap-x-2">
                    <Button
                        variant="secondary"
                        className="size-8 p-0"
                        onClick={() => setShowButtons(false)}
                    >
                        <XIcon className="size-4" />
                    </Button>
                    <Button onClick={onSave} className="size-8 p-0">
                        <CheckIcon className="size-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}

export default IssueInput;
