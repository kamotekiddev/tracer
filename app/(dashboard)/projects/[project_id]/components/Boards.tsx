import { Board } from '@prisma/client';
import CreateBoardModal from './CreateBoardModal';

interface BoardsProps {
    boards?: Board[];
}
function Boards({ boards = [] }: BoardsProps) {
    return (
        <div className='flex gap-4 h-full'>
            <CreateBoardModal />

            {boards.map((board) => (
                <pre key={board.id}>{JSON.stringify(board, null, 2)}</pre>
            ))}
        </div>
    );
}

export default Boards;
