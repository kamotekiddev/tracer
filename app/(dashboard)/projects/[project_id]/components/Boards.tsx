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
            <div className='p-4 bg-indigo-600 text-white'>
                <h1>{board.name}</h1>
            </div>
            <div className='p-4'>
                {board.tickets.map((ticket) => (
                    <p
                        key={ticket.id}
                        className='p-4 bg-white rounded-lg border'
                    >
                        {ticket.title}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Boards;
