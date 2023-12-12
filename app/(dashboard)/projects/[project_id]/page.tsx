import { getProjectById } from '@/lib/actions/projects.action';

interface Params {
    project_id: string;
}

interface SearchParams {}
interface ProjectDetailProps {
    params: Params;
    searchParams: SearchParams;
}
async function ProjectDetails({ params }: ProjectDetailProps) {
    const { project_id } = params;

    const { data: project } = await getProjectById(project_id);

    return (
        <main className='p-4'>
            <h1 className='text-3xl font-bold'>{project?.name}</h1>
            <span className='text-black/70'>{project?.key}</span>
        </main>
    );
}

export default ProjectDetails;
