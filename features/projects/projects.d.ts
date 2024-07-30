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

export interface Issue {
    id: string;
    title: string;
    description: null;
    number: number;
    type: "TASK" | "BUG" | "STORY";
    categoryId: string;
    reporterId: string;
    reporter: User;
    assigneeId: string | null;
    assignee: User | null;
}

export interface IssueWithProject extends Issue {
    project: Project;
}
export interface Category {
    id: string;
    name: string;
    projectId: string;
}

export interface CategoryWithIssue extends Category {
    issues: IssueWithProject[];
}

export interface Sprint {
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
    categories: CategoryWithIssue[];
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
