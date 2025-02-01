'use server';

import { ContestDetailed, ContestList, ContestListItem, ProblemDetailed } from "@/api/dto/response";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ID = string | number;

const BASEPATH = 'https://void.ndbtea.tech/api';
const COOKIE_KEY = 'token';

export async function getProblem(cid: ID, pid: ID): Promise<ProblemDetailed> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/contests/${cid}/problems/${pid}`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get problem`);
    }

    return await res.json() as ProblemDetailed;
}

export async function getContest(cid: ID): Promise<ContestDetailed> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/contests/${cid}`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get contest`);
    }

    return await res.json() as ContestDetailed;
}

export async function getContests(): Promise<ContestList> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/contests`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get contests`);
    }

    return await res.json() as ContestList;
}

export async function revalidate(path: string) {
    revalidatePath(path);
}
