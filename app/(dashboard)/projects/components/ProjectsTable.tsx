'use client';

import Link from 'next/link';
import { MoreHorizontal, Star } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetProjects } from '@/hooks/useProjects';

function ProjectsTable() {
    const { data: projects } = useGetProjects();

    return (
        <Table className='border-b-2'>
            <TableHeader className='border-b-2'>
                <TableRow>
                    <TableHead className='w-[100px]'>
                        <Star className='h-4 w-4' />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className='w-[200px]'>Key</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {projects?.data?.map((project) => (
                    <TableRow key={project.id}>
                        <TableCell className='font-medium'>
                            <Star className='h-4 w-4' />
                        </TableCell>
                        <TableCell>
                            <Link
                                href={`/projects/${project.id}`}
                                className='font-semibold hover:underline text-primary hover:text-primary/90 transition-all duration-300 ease-linear'
                            >
                                {project.name}
                            </Link>
                        </TableCell>
                        <TableCell>{project.key}</TableCell>
                        <TableCell>
                            <div className='flex gap-4 items-center'>
                                <Avatar>
                                    <AvatarImage src={project.owner.image!} />
                                    <AvatarFallback>
                                        {project.owner.name
                                            ?.split(' ')
                                            .slice(0, 2)
                                            .map((name) => name[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <h1>{project.owner.name}</h1>
                            </div>
                        </TableCell>
                        <TableCell>20</TableCell>
                        <TableCell className='text-right'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='outline' size='icon'>
                                        <MoreHorizontal className='h-4 w-4' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='-translate-x-8'>
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Delete Project
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Update Project
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Leave Project
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ProjectsTable;
