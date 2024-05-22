"use client";

import NavigationList from "@/components/NavigationList";
import { useRouter, useSearchParams } from "next/navigation";

const projectsNavigation = [
    { title: "All", value: "ALL" },
    { title: "My Projects", value: "MY_PROJECTS" },
    { title: "I am Member", value: "I_AM_MEMBER" },
];

function ProjectsNavigation() {
    const params = useSearchParams();
    const router = useRouter();
    const value = params.get("filter") || "ALL";

    return (
        <NavigationList
            items={projectsNavigation}
            value={value}
            onChange={(value) => router.push(`/projects?filter=${value}`)}
        />
    );
}

export default ProjectsNavigation;
