import { ContestDetailed, ContestID, ContestListItem } from "./dto/response";
import { authorized, unauthorized } from "./core/instance";
import { CreateContest } from "./dto/request";

export interface Contestlist {
    data: ContestListItem[];
}

export const fetchByID = async (id: number | string): Promise<ContestDetailed | undefined> => {
    try {
        const { data } = await authorized.get(`/contests/${id}`);
        return data;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export const fetchActive = async (): Promise<ContestListItem[]> => {
    try {
        const { data } = await unauthorized.get('/contests');
        return data.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const create = async (contest: CreateContest): Promise<ContestID | undefined> => {
    try {
        const { data } = await authorized.post("/contests", contest);
        return data;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export const apply = async (id: number | string): Promise<number | undefined> => {
    try {
        const { status } = await authorized.post(`/contests/${id}/entry`);
        return status;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}