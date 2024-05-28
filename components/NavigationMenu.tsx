"use client";

import React, { PropsWithChildren } from "react";
import {
    NavigationMenu as Menu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export interface Item {
    value: string;
    title: string;
    description: string;
}

interface Props extends PropsWithChildren {
    items: Item[];
    onSelect: (value: Item["value"]) => void;
}

function NavigationMenu({ items, onSelect, children }: Props) {
    return (
        <Menu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-10 rounded-none border-b-4 border-transparent p-0 hover:bg-transparent data-[state=open]:border-b-neutral-950 data-[state=closed]:bg-transparent data-[state=open]:bg-transparent data-[state=open]:font-bold">
                        {children}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[300px] lg:w-[400px]">
                            {items.map(({ title, description, value }, idx) => (
                                <ListItem
                                    title={title}
                                    key={idx}
                                    onClick={() => onSelect(value)}
                                >
                                    {description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </Menu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"button">,
    React.ComponentPropsWithoutRef<"button">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <button
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 text-left leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className,
                    )}
                    {...props}
                >
                    <div className="font-semibold leading-none">{title}</div>
                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        {children}
                    </p>
                </button>
            </NavigationMenuLink>
        </li>
    );
});

ListItem.displayName = "ListItem";

export default NavigationMenu;
