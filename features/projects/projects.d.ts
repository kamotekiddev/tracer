import { User } from "../interfaces/user";

export interface Project {
    id: string;
    name: string;
    members: number;
    issues: number;
    ownerId: string;
    owner: User;
    createdAt: string;
    updatedAt: string;
}
