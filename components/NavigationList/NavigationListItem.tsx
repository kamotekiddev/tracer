import { PropsWithChildren } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren, ButtonProps {
    isActive?: boolean;
}

function NavigationListItem({
    children,
    isActive,
    className,
    ...props
}: Props) {
    return (
        <Button
            size="sm"
            variant="outline"
            {...props}
            className={cn(
                "rounded-none border-x-0 border-b-4 border-t-0 border-transparent px-0 hover:bg-transparent",
                isActive && "border-slate-950 font-bold",
                className,
            )}
        >
            {children}
        </Button>
    );
}

export default NavigationListItem;
