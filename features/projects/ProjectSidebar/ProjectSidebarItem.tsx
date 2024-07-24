import { PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren, LinkProps {
    active?: boolean;
}

function ProjectSidebarItem({ children, active, ...props }: Props) {
    return (
        <Link {...props} className="block">
            <Button
                variant={active ? "secondary" : "ghost"}
                className={cn(
                    "block w-full rounded-s-none border-l-4 border-l-transparent text-start hover:bg-transparent hover:text-primary",
                    active && "border-l-primary",
                )}
            >
                {children}
            </Button>
        </Link>
    );
}

export default ProjectSidebarItem;
