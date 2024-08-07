import { ArchiveIcon } from "lucide-react";
import type { SelectProps } from "@radix-ui/react-select";

import {
    Select as SelectRoot,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

interface Option {
    label: string;
    value: string;
}

interface Props extends SelectProps {
    data: Option[];
    placeholder?: string;
}

function Select({ data, placeholder, ...props }: Props) {
    return (
        <SelectRoot {...props}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {!data.length && (
                    <div className="flex cursor-default items-center gap-2 p-4 text-neutral-400">
                        <ArchiveIcon />
                        No data to select
                    </div>
                )}
                {data.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                        {d.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
}

export default Select;
