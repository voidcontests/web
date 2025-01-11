import axios from "axios";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const instance = axios.create({
    baseURL: DOMAIN + "/api",
});

export default instance;