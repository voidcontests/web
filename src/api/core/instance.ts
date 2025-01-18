import axios from "axios";

const DOMAIN = 'https://void.ndbtea.tech';

const authorized = axios.create({
    baseURL: DOMAIN + "/api",
});

authorized.interceptors.request.use((config) => {
    // TODO: Move local storage key to other place to not repeat it
    const token = localStorage.getItem("void-access-token");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

const unauthorized = axios.create({
    baseURL: DOMAIN + "/api",
});

export { authorized, unauthorized };