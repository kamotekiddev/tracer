import { Board, Ticket } from '@prisma/client';

export interface FullBoard extends Board {
    tickets: Ticket[];
}
