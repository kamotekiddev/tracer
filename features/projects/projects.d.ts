import { User } from "../interfaces/user";

export interface Project {
    id: string;
    name: string;
    key: string;
    description?: string;
    members: number;
    issues: number;
    ownerId: string;
    owner: User;
    createdAt: string;
    updatedAt: string;
}
