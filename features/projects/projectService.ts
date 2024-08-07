import client from "../services/api";
import { CreateProjectSchemaType } from "./CreateProjectModal";
import { CreateSprintRequest } from "./sprint/CreateSprintModal";
import { CreateIssueRequest } from "./issue/CreateIssueInline";

export const getProjects = async (filter?: string) => {
    const res = await client.get("/projects", { params: { filter } });
    return res.data;
};

export const createProject = async (body: CreateProjectSchemaType) => {
    const res = await client.post("/projects", body);
    return res.data;
};

export const getProjectById = async (projectId: string) => {
    const res = await client.get(`/projects/${projectId}`);
    return res.data;
};

export const getProjectBacklogs = async (projectId: string) => {
    const res = await client.get(`/projects/${projectId}/backlogs`);
    return res.data;
};

export const createSprint = async (data: CreateSprintRequest) => {
    const res = await client.post("/sprints", data);
    return res.data;
};

export const completeSprint = async (projectId: string) => {
    const res = await client.patch(`/sprints/${projectId}/complete`);
    return res.data;
};

export const getProjectMembers = async (projectId: string) => {
    const res = await client.get(`/projects/${projectId}/members`);
    return res.data;
};

export const getProjectCategories = async (projectId: string) => {
    const res = await client.get(`/projects/${projectId}/categories`);
    return res.data;
};

export const getProjectSprints = async (projectId: string) => {
    const res = await client.get(`/projects/${projectId}/sprints`);
    return res.data;
};
