import client from "./api";

export const getUserById = async (userId?: string) => {
    const res = await client.get(`/users/${userId}`);
    return res.data;
};
