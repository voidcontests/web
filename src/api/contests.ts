import type { Contest } from "@/models/contest";
import instance from "./core/instance";

export interface Contests {
    amount: number;
    contests: Contest[];
}

export const getContests = async (): Promise<Contests | undefined> => {
    try {
        const { data } = await instance.get('/contests');

        return { amount: data.amount, contests: data.contests };
    } catch (e) {
        console.error(e);
        return undefined;
    }
}