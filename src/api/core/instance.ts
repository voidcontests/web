import { config } from "@/config";
import Cookies from "js-cookie";
import axios from "axios";

const authorized = axios.create({
    baseURL: config.api.basepath,
    timeout: 0,
});

authorized.interceptors.request.use((axiosconfig) => {
    const token = Cookies.get(config.cookies.token_key)

    axiosconfig.headers.Authorization = `Bearer ${token}`;

    return axiosconfig;
});

authorized.interceptors.response.use(
    response => response,
    error => Promise.resolve(error.response),
);

export { authorized };
