import client from "../services/api";

export const getProjects = async () => {
    const res = await client.get("/projects");
    return res.data;
};
