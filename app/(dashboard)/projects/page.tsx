import Link from 'next/link';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { getProjects } from '@/lib/actions/projects.action';
import ProjectsTable from './components/ProjectsTable';

async function Projects() {
    const { data: projects } = await getProjects();

    return (
        <main className='p-4 space-y-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-bold'>Projects</h1>
                <Link
                    href='/projects/new'
                    className={buttonVariants({ size: 'sm' })}
                >
                    New Project
                </Link>
            </div>
            <div className='w-max flex gap-4'>
                <Input placeholder='Search...' />
                <Input placeholder='Filter...' />
            </div>
            <ProjectsTable projects={projects} />
            <div className='flex gap-2'>
                <Button variant='outline' size='icon'>
                    <ChevronLeft className='w-4 h-4' />
                </Button>
                <Button variant='outline' size='icon'>
                    <ChevronRight className='w-4 h-4' />
                </Button>
            </div>
        </main>
    );
}

export default Projects;
