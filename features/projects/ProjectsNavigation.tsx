"use client";

import NavigationList from "@/components/NavigationList";
import { useRouter, useSearchParams } from "next/navigation";

const projectsNavigation = [
    { title: "All", value: "all" },
    { title: "My Projects", value: "my-projects" },
    { title: "I am Member", value: "i-am-member" },
];

function ProjectsNavigation() {
    const params = useSearchParams();
    const router = useRouter();
    const value = params.get("filter") || "all";

    return (
        <NavigationList
            items={projectsNavigation}
            value={value}
            onChange={(value) => router.push(`/projects?filter=${value}`)}
        />
    );
}

export default ProjectsNavigation;
