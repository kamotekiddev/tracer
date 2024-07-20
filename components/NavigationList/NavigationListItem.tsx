import { PropsWithChildren } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

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
        <div
            className={cn(
                "relative grid min-h-[50px] place-items-center",
                className,
            )}
        >
            <Button
                {...props}
                variant="outline"
                className={cn(
                    "border-none p-0 hover:bg-transparent hover:text-primary",
                    isActive && "font-bold text-primary",
                )}
            >
                {children}
            </Button>
            {isActive && (
                <Separator className="absolute bottom-0 h-1 bg-primary" />
            )}
        </div>
    );
}

export default NavigationListItem;
