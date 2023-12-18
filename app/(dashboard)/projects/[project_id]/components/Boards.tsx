import { ReactNode } from 'react';
import { BadgeAlertIcon, BugIcon, ClipboardCheckIcon } from 'lucide-react';
import { Ticket } from '@prisma/client';

import { FullBoard } from '@/types/board';
import CreateBoardModal from './CreateBoardModal';

interface BoardsProps {
    boards?: FullBoard[];
}
function Boards({ boards = [] }: BoardsProps) {
    return (
        <div className='flex gap-4 h-full'>
            <CreateBoardModal />

            {boards.map((board) => (
                <BoardItem key={board.id} board={board} />
            ))}
        </div>
    );
}

interface BoardProps {
    board: FullBoard;
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
    return (
        <div className='p-4 bg-white rounded-lg'>
            <div className='flex gap-4'>
                <div className='flex-shrink-0'>
                    {TicketTypeMap[ticket.type]}
                </div>
                <h1>{ticket.title}</h1>
            </div>
        </div>
    );
}

export default Boards;
