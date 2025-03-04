import { DOMAIN } from "@/config";
import Cookies from "js-cookie";
import axios from "axios";

const authorized = axios.create({
    baseURL: DOMAIN + "/api",
});

authorized.interceptors.request.use((config) => {
    const token = Cookies.get("token")

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

authorized.interceptors.response.use(
    response => response,
    error => Promise.resolve(error.response),
);

export { authorized };
