import { getProjectById } from '@/lib/actions/projects.action';
import Boards from './components/Boards';

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
        <main className='p-4 grid grid-rows-[auto_1fr] gap-4'>
            <header>
                <h1 className='text-3xl font-bold'>{project?.name}</h1>
                <span className='text-black/70'>{project?.key}</span>
            </header>
            <section>
                <Boards />
            </section>
        </main>
    );
}

export default ProjectDetails;
