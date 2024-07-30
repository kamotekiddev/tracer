import { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/features/projects/sidebar";

function ProjectLayout({ children }: PropsWithChildren) {
    return (
        <div className="grid grid-cols-[250px_auto_1fr]">
            <Sidebar />
            <Separator orientation="vertical" />
            {children}
        </div>
    );
}

export default ProjectLayout;
