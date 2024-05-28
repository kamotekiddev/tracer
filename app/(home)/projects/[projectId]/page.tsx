import { Separator } from "@/components/ui/separator";
import ProjectContent from "@/features/projects/ProjectContent";

interface Props {
    params: { projectId: string };
}

function ViewProjectPage({ params }: Props) {
    return (
        <div className="grid grid-cols-[250px_auto_1fr]">
            <aside className="p-4">Sidebar</aside>
            <Separator orientation="vertical" />
            <ProjectContent projectId={params.projectId} />
        </div>
    );
}

export default ViewProjectPage;
