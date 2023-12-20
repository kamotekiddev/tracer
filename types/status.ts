import { Status } from '@prisma/client';
import { FullTicket } from './ticket';

export interface FullStatus extends Status {
    tickets: FullTicket[];
}
