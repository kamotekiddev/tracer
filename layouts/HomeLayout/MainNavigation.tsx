"use client";
import NavigationList from "@/components/navigation-list";
import { usePathname, useRouter } from "next/navigation";

const mainNavItems = [
    { title: "Your Work", value: "/issues" },
    { title: "Projects", value: "/projects" },
];

function MainNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <NavigationList
            value={pathname}
            items={mainNavItems}
            onChange={(value) => router.push(value)}
        />
    );
}

export default MainNavigation;
