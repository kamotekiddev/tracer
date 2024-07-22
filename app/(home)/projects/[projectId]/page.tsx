import ProjectContent from "@/features/projects/ProjectContent";

interface Props {
    params: { projectId: string };
}

function ViewProjectPage({ params }: Props) {
    return <ProjectContent projectId={params.projectId} />;
}

export default ViewProjectPage;
