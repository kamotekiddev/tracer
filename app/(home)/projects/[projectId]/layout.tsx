import { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";
import ProjectSidebar from "@/features/projects/project-sidebar";

function ProjectLayout({ children }: PropsWithChildren) {
    return (
        <div className="grid grid-cols-[250px_auto_1fr]">
            <ProjectSidebar />
            <Separator orientation="vertical" />
            {children}
        </div>
    );
}

export default ProjectLayout;
