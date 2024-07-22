import { DatabaseIcon } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    title?: string;
    createText?: string;
    onCreate: () => void;
}

function EmptyState({
    title = "No data found.",
    createText = "Create",
    onCreate,
}: Props) {
    return (
        <div className="grid place-items-center">
            <div className="grid place-items-center space-y-8 text-center">
                <div className="grid size-[100px] place-items-center rounded-full bg-neutral-100">
                    <DatabaseIcon className="size-[50px]" />
                </div>
                <h1 className="text-2xl font-semibold">{title}</h1>
                <Button onClick={onCreate}>{createText}</Button>
            </div>
        </div>
    );
}

export default EmptyState;
