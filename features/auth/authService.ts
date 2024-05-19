import client from "../services/api";
import { LoginSchemaType } from "./login/validation";

export const login = (credential: LoginSchemaType) =>
    client.post("/auth/login", credential);
