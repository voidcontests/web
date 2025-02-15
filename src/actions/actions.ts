'use server';

import { ContestDetailed, ContestList, EntityID, ProblemDetailed, ProblemList, ProblemListItem } from "@/api/dto/response";
import { FormData as CreateProblemFormData } from "@/components/forms/create-problem";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ID = string | number;

// const BASEPATH = 'https://void.ndbtea.tech/api';
const BASEPATH = 'http://localhost:6969/api';
const COOKIE_KEY = 'token';

export async function createProblem(data: CreateProblemFormData): Promise<EntityID> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/problems`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`can't create problem`);
    }

    return await res.json() as EntityID;
}


export async function getProblem(cid: ID, charcode: string): Promise<ProblemDetailed> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/contests/${cid}/problems/${charcode}`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get problem`);
    }

    return await res.json() as ProblemDetailed;
}

export async function getAdminProblems(): Promise<ProblemList> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/creator/problems`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get admin problems`);
    }

    return await res.json() as ProblemList;
}

export async function getAdminContests(): Promise<ContestList> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/creator/contests`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get admin contests`);
    }

    return await res.json() as ContestList;
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
