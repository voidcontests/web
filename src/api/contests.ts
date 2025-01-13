import type { Contest } from "@/models/contest";
import instance from "./core/instance";
import { ContestResponse, CreateContestRequest, ContestDetailedResponse } from "./dto/dto";

export interface Contests {
    data: Contest[];
}

export const getByID = async (id: number | string): Promise<ContestDetailedResponse | undefined> => {
    try {
        const { data } = await instance.get(`/contests/${id}`);
        return data
    } catch (e) {
        console.error(e);
        return undefined;
    }
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

export const create = async (contest: CreateContestRequest): Promise<ContestResponse | undefined> => {
    try {
        const { data } = await instance.post("/contests", contest);

        return data;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}