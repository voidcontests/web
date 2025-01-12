import type { Contest } from "@/models/contest";
import instance from "./core/instance";

export interface Contests {
    data: Contest[];
}

export const getContests = async (): Promise<Contests | undefined> => {
    try {
        const { data } = await instance.get('/contests');

        return data;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}