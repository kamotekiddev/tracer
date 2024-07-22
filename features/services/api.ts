import { fromUnixTime, isBefore } from "date-fns";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const client = axios.create({ baseURL });

const refreshToken = async (refreshToken: string) => {
    const response: AxiosResponse<{
        accessToken: string;
    }> = await axios.patch(`${baseURL}/auth/refresh`, {
        refreshToken,
    });

    const accessToken = response.data.accessToken;
    Cookies.set("bearer", response.data.accessToken);

    return accessToken;
};

client.interceptors.request.use(
    async (req) => {
        const token = Cookies.get("bearer");
        const refresh = Cookies.get("refresh");

        if (!token) return req;
        req.headers.Authorization = `Bearer ${token}`;

        if (!refresh) return req;

        const { exp } = jwtDecode(token);
        const expiration = fromUnixTime(exp!);
        const isExpired = isBefore(expiration, new Date());

        if (!isExpired) return req;

        const accessToken = await refreshToken(refresh);
        req.headers.Authorization = `Bearer ${accessToken}`;

        return req;
    },
    (error) => Promise.reject(error),
);

export default client;
