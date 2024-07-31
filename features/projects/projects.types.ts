import { User } from "../interfaces/user";
import { Issue, IssueWithProject } from "./issue/issue.types";

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
