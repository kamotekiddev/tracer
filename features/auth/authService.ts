import client from "../services/api";
import { LoginSchemaType } from "./login/validation";

export const login = (credential: LoginSchemaType) =>
    client.post("/auth/login", credential);

export const refresh = (refreshToken: string) =>
    client.patch("/auth/refresh", { refreshToken });
