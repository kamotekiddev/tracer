import { getProjectById } from '@/lib/actions/projects.action';
import Boards from './components/Boards';
import CreateTicketModal from './components/CreateTicketModal';

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
            <header className='flex gap-4 items-center justify-between'>
                <h1 className='text-3xl font-bold'>{project?.name}</h1>
                <CreateTicketModal boards={project?.boards} />
            </header>
            <section>
                <Boards boards={project?.boards} />
            </section>
        </main>
    );
}

export default ProjectDetails;
