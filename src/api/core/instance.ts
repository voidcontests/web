import axios from "axios";

const DOMAIN = 'https://void.ndbtea.tech';

const instance = axios.create({
    baseURL: DOMAIN + "/api",
});

instance.interceptors.request.use((config) => {
    // TODO: Move local storage key to other place to not repeat it
    const token = localStorage.getItem("void-access-token");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default instance;