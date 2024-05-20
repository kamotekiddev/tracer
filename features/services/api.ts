import Cookies from "js-cookie";
import axios from "axios";

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

client.interceptors.request.use(
    (config) => {
        const token = Cookies.get("bearer");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default client;
