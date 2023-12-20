'use client';

import { PropsWithChildren, useState } from 'react';
import { Status, Ticket, User } from '@prisma/client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { reAssignTicket } from '@/lib/actions/ticket.action';

interface ViewTicketModalProps extends PropsWithChildren {
    ticket: Ticket;
    statuses?: Status[];
    members?: User[];
}

function ViewTicketModal({
    children,
    ticket,
    statuses = [],
    members = [],
}: ViewTicketModalProps) {
    const [open, setOpen] = useState(false);

    const handleChangeAssignee = async (value: string) => {
        const { isError, isSuccess, error } = await reAssignTicket({
            ticket_id: ticket.id,
            assignee_id: value,
            pathToRevalidate: '/projects/[project_id]',
        });

        if (isSuccess) console.log('The ticket has been re-assigned');
        if (isError) console.log(error);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className='text-left'>{children}</SheetTrigger>
            <SheetContent className='min-w-[500px] space-y-4'>
                <div>
                    <span className='capitalize text-indigo-600 text-xs'>
                        {ticket.type}
                    </span>
                    <h1 className='text-xl font-medium'>{ticket.title}</h1>
                </div>
                <div className='min-h-[200px] bg-indigo-100 rounded-lg'>
                    {/* TODO this is the content to be replaced with rich text editor */}
                    {/* TODO to be replaced with parsed html */}
                    {/* TODO rename boarditem to status */}
                </div>
                <div className='p-4 rounded-lg border space-y-4'>
                    <h2 className='font-medium text-lg'>Details</h2>
                    <div className='grid grid-cols-[minmax(50px,_1fr)_1fr] items-center'>
                        <label>Status:</label>
                        <Select value={ticket.status_id}>
                            <SelectTrigger className='h-auto border-none focus:ring-0'>
                                <SelectValue placeholder='Select Board' />
                            </SelectTrigger>
                            <SelectContent>
                                {statuses?.map(({ id, name }) => (
                                    <SelectItem value={id} key={id}>
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='grid grid-cols-[minmax(50px,_1fr)_1fr] items-center'>
                        <label>Assignee:</label>
                        <Select
                            value={ticket.assignee_id || ''}
                            onValueChange={handleChangeAssignee}
                        >
                            <SelectTrigger className='h-auto border-none focus:ring-0'>
                                <SelectValue placeholder='Unassigned' />
                            </SelectTrigger>
                            <SelectContent>
                                {members?.map(({ id, name, image }) => (
                                    <SelectItem
                                        key={id}
                                        value={id}
                                        className='h-auto'
                                    >
                                        <div className='flex items-center gap-2'>
                                            <Avatar className='h-[30px] w-[30px]'>
                                                {image && (
                                                    <AvatarImage src={image} />
                                                )}
                                                <AvatarFallback>
                                                    {name}
                                                </AvatarFallback>
                                            </Avatar>
                                            {name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default ViewTicketModal;
