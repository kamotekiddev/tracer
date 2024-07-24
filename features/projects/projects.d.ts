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

interface Issue {
    id: string;
    title: string;
    description: null;
    type: "TASK" | "BUG" | "STORY";
    categoryId: string;
    reporterId: string;
    reporter: User;
    assigneeId: string | null;
    assignee: User | null;
}
interface Category {
    id: string;
    name: string;
    projectId: string;
    issues: Issue[];
    sprintId: string | null;
}

interface Sprint {
    id: string;
    number: number;
    startDate: string;
    endDate: string;
    completed: boolean;
    projectId: string;
}

export interface ProjectWithCompleteDetails
    extends Omit<Project, "issues" | "members"> {
    members: User[];
    issues: Issue[];
    categories: Category[];
    currentSprintId: string | null;
    currentSprint: Sprint | null;
}

export interface IssueWithCategory extends Issue {
    category: Omit<Category, "issues">;
}

export interface ProjectBackLog {
    id: string;
    number: number;
    startDate: string;
    endDate: string;
    completed: boolean;
    projectId: string;
    issues: IssueWithCategory[];
    categories: [];
}
