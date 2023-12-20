import { PropsWithChildren, ReactNode } from 'react';
import { Ticket } from '@prisma/client';
import {
    BadgeAlertIcon,
    BugIcon,
    ClipboardCheckIcon,
    UserIcon,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { getStatusById } from '@/lib/actions/status.action';
import { getProjectMembers } from '@/lib/actions/projects.action';
import { FullStatus } from '@/types/status';
import CreateStatusModal from './CreateStatusModal';

interface BoardsProps {
    statuses?: FullStatus[];
}
function Boards({ statuses = [] }: BoardsProps) {
    return (
        <div className='flex gap-4 h-full'>
            <CreateStatusModal />

            {statuses.map((status) => (
                <BoardItem key={status.id} board={status} />
            ))}
        </div>
    );
}

interface BoardProps {
    board: FullStatus;
}

function BoardItem({ board }: BoardProps) {
    return (
        <div className=' bg-indigo-50/60 flex-1 rounded-lg overflow-hidden'>
            <div className='p-4 bg-indigo-600/80 text-white'>
                <h1>{board.name}</h1>
            </div>
            <div className='p-2 grid gap-2'>
                {board.tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
}

interface TicketCardProps {
    ticket: Ticket;
}

const TicketTypeMap: Record<string, ReactNode> = {
    issue: <BadgeAlertIcon className='text-orange-500' />,
    bug: <BugIcon className='text-red-500' />,
    task: <ClipboardCheckIcon className='text-blue-500' />,
};

function TicketCard({ ticket }: TicketCardProps) {
    const TicketIcon = TicketTypeMap[ticket.type];

    return (
        <ViewTicketModal ticket={ticket}>
            <div className='p-4 bg-white rounded-lg space-y-4'>
                <div className='flex gap-4'>
                    <div className='flex-shrink-0'>{TicketIcon}</div>
                    <h1 className='line-clamp-1'>{ticket.title}</h1>
                </div>
                <div className='h-[30px] grid place-items-center w-[30px] rounded-full bg-gray-100'>
                    <UserIcon className='h-[15px] w-[15px] text-gray-500' />
                </div>
            </div>
        </ViewTicketModal>
    );
}

interface ViewTicketModalProps extends PropsWithChildren {
    ticket: Ticket;
}

async function ViewTicketModal({ children, ticket }: ViewTicketModalProps) {
    const { data: boards } = await getStatusById(ticket.project_id);
    const { data: members } = await getProjectMembers(ticket.project_id);

    return (
        <Sheet>
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
                                {boards?.map(({ id, name }) => (
                                    <SelectItem value={id} key={id}>
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='grid grid-cols-[minmax(50px,_1fr)_1fr] items-center'>
                        <label>Assignee:</label>
                        <Select>
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

export default Boards;
