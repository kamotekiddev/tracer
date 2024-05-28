import client from "../services/api";
import { CreateProjectSchemaType } from "./CreateProjectModal";

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
