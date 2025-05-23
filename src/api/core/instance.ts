import { BASEPATH, TOKEN_COOKIE_KEY } from "@/config";
import Cookies from "js-cookie";
import axios from "axios";

const authorized = axios.create({
    baseURL: BASEPATH,
    timeout: 0,
});

authorized.interceptors.request.use((config) => {
    const token = Cookies.get(TOKEN_COOKIE_KEY)

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

authorized.interceptors.response.use(
    response => response,
    error => Promise.resolve(error.response),
);

export { authorized };
