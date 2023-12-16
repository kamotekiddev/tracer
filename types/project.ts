import { Ticket, Project, User } from '@prisma/client';

export interface FullProject extends Project {
    owner: User;
    starred_by: User[];
    tickets: Ticket[];
}
