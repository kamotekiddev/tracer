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

export enum UpdateIssueEvent {
    SUMMARY_CHANGE = "SUMMARY_CHANGE",
    DESCRIPTION_CHANGE = "DESCRIPTION_CHANGE",
    TYPE_CHANGE = "TYPE_CHANGE",
    CATEGORY_CHANGE = "CATEGORY_CHANGE",
    ASSIGNEE_CHANGE = "ASSIGNEE_CHANGE",
    SPRINT_CHANGE = "SPRINT_CHANGE",
}

export interface IssueHistory {
    id: string;
    event: UpdateIssueEvent;
    oldData: string;
    changes: string;
    createdAt: string;
    updated: string;
    userId: string;
    issueId: string;
    user: User;
}

export interface UpdateIssueRequest extends Partial<Issue> {
    issueId: string;
    updateEvent: UpdateIssueEvent;
}

export interface IssueComment {
    id: string;
    text: string;
    photos: string[];
    createdAt: string;
    updatedAt: string;
    authorId: string;
    author: User;
    issueId: string;
}
