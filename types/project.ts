import { Project, User } from '@prisma/client';

export type FullProject = Project & {
    owner: User;
    starred_by: User[];
};
