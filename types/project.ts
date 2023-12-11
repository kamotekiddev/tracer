import { Issue, Project, User } from '@prisma/client';

export interface FullProject extends Project {
    owner: User;
    starred_by: User[];
    issues: Issue[];
}
