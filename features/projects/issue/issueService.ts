import client from "@/features/services/api";
import { CreateIssueRequest } from "./CreateIssueInline";

export const getIssueById = async (issueId: string) => {
    const res = await client.get(`/issues/${issueId}`);
    return res.data;
};

export const createIssue = async (data: CreateIssueRequest) => {
    const res = await client.post("/issues", data);
    return res.data;
};

export const getIssueHistory = async (issueId: string) => {
    const res = await client.get(`/issues/${issueId}/history`);
    return res.data;
};

export const getCategoryById = async (categoryId: string) => {
    const res = await client.get(`/categories/${categoryId}`);
    return res.data;
};
