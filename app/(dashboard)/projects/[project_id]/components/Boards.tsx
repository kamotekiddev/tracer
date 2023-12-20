import { ReactNode } from 'react';
import { Status, Ticket } from '@prisma/client';
import {
    BadgeAlertIcon,
    BugIcon,
    ClipboardCheckIcon,
    UserIcon,
} from 'lucide-react';
import { FullStatus } from '@/types/status';
import CreateStatusModal from './CreateStatusModal';
import ViewTicketModal from './ViewTicketModal';
import { getStatusById } from '@/lib/actions/status.action';
import { getProjectMembers } from '@/lib/actions/projects.action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FullTicket } from '@/types/ticket';

interface BoardsProps {
    statuses?: FullStatus[];
}

function Boards({ statuses = [] }: BoardsProps) {
    return (
        <div className='flex gap-4 h-full'>
            <CreateStatusModal />

            {statuses.map((status) => (
                <BoardItem key={status.id} status={status} />
            ))}
        </div>
    );
}

interface BoardProps {
    status: FullStatus;
}

function BoardItem({ status }: BoardProps) {
    return (
        <div className=' bg-indigo-50/60 flex-1 rounded-lg overflow-hidden'>
            <div className='p-4 bg-indigo-600/80 text-white'>
                <h1>{status.name}</h1>
            </div>
            <div className='p-2 grid gap-2'>
                {status.tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
}

interface TicketCardProps {
    ticket: FullTicket;
}

const TicketTypeMap: Record<string, ReactNode> = {
    issue: <BadgeAlertIcon className='text-orange-500' />,
    bug: <BugIcon className='text-red-500' />,
    task: <ClipboardCheckIcon className='text-blue-500' />,
};

async function TicketCard({ ticket }: TicketCardProps) {
    const TicketIcon = TicketTypeMap[ticket.type];
    const { data: statuses } = await getStatusById(ticket.project_id);
    const { data: members } = await getProjectMembers(ticket.project_id);

    return (
        <ViewTicketModal ticket={ticket} statuses={statuses} members={members}>
            <div className='p-4 bg-white rounded-lg space-y-4'>
                <div className='flex gap-4'>
                    <div className='flex-shrink-0'>{TicketIcon}</div>
                    <h1 className='line-clamp-1'>{ticket.title}</h1>
                </div>
                <div className='h-[30px] grid place-items-center w-[30px] rounded-full bg-gray-100'>
                    <Avatar className='h-[30px] w-[30px]'>
                        {ticket?.assignee?.image && (
                            <AvatarImage src={ticket.assignee.image} />
                        )}
                        <AvatarFallback>
                            <UserIcon className='h-[15px] w-[15px] text-gray-500' />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </ViewTicketModal>
    );
}

export default Boards;
