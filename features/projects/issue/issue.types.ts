import { User } from "@/features/interfaces/user";
import { Project, Sprint } from "../projects.types";

export interface Issue {
    id: string;
    summary: string;
    description: string | null;
    number: number;
    type: "TASK" | "BUG" | "STORY";
    categoryId: string;
    reporterId: string;
    sprintId: string;
    reporter: User;
    assigneeId: string | null;
    assignee: User | null;
}

export interface IssueWithProject extends Issue {
    project: Project;
    sprint: Sprint;
}
