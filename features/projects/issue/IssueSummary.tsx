import { CheckIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Issue } from "./issue.types";
import { useState } from "react";

interface Props {
    issue: Issue;
}

function IssueSummary({ issue }: Props) {
    const [showEditor, setShowEditor] = useState(false);
    const [summary, setSummary] = useState(issue.summary);

    if (!showEditor)
        return (
            <h1
                className="py-2 text-xl hover:bg-neutral-100"
                onClick={() => setShowEditor(true)}
            >
                {summary}
            </h1>
        );

    return (
        <div className="space-y-2">
            <Input
                autoFocus
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="text-xl"
            />
            <div className="flex justify-end gap-x-2">
                <Button
                    variant="secondary"
                    className="size-8 p-0"
                    onClick={() => setShowEditor(false)}
                >
                    <XIcon className="size-4" />
                </Button>
                <Button className="size-8 p-0">
                    <CheckIcon className="size-4" />
                </Button>
            </div>
        </div>
    );
}

export default IssueSummary;
