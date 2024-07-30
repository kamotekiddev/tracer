import Project from "@/features/projects/project";

interface Props {
    params: { projectId: string };
}

function ViewProjectPage({ params }: Props) {
    return <Project projectId={params.projectId} />;
}

export default ViewProjectPage;
