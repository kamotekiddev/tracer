import { Status, Ticket } from '@prisma/client';

export interface FullStatus extends Status {
    tickets: Ticket[];
}
