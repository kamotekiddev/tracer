import client from "../services/api";

export const getProjects = async (filter?: string) => {
    const res = await client.get("/projects", { params: { filter } });
    return res.data;
};
