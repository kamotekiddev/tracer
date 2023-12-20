import { Ticket, User } from '@prisma/client';

export interface FullTicket extends Ticket {
    assignee: User | null;
}
