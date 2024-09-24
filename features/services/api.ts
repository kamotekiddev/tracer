import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

import { isJwtTokenExpired } from "@/lib/utils";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const client = axios.create({ baseURL });

const refreshUserToken = async (refreshToken: string) => {
    const isRefreshTokenExpired = isJwtTokenExpired(refreshToken);

    if (isRefreshTokenExpired) {
        Cookies.remove("refresh");
        return Cookies.remove("bearer");
    }

    const response: AxiosResponse<{
        accessToken: string;
    }> = await axios.patch(`${baseURL}/auth/refresh`, {
        refreshToken,
    });

    const newAccessToken = response.data.accessToken;
    Cookies.set("bearer", newAccessToken);

    return newAccessToken;
};

client.interceptors.request.use(
    async (req) => {
        const accessToken = Cookies.get("bearer");
        const refreshToken = Cookies.get("refresh");

        if (!accessToken) return req;
        req.headers.Authorization = `Bearer ${accessToken}`;

        if (!refreshToken) return req;
        const isAcessTokenExpired = isJwtTokenExpired(accessToken);

        if (!isAcessTokenExpired) return req;

        const newAccessToken = await refreshUserToken(refreshToken);
        req.headers.Authorization = `Bearer ${newAccessToken}`;

        return req;
    },
    (error) => Promise.reject(error),
);

export default client;
