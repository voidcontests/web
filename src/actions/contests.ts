'use server';

import { ContestDetailed, ContestList, EntityID, Leaderboard, ProblemDetailed } from "@/actions/dto/response";
import { FormData as CreateContestFormData } from "@/components/forms/create-contest";
import { config } from "@/config";
import { cookies } from "next/headers";
import { ID } from ".";

export async function createContest(data: CreateContestFormData): Promise<EntityID> {
    const cookieStore = cookies();
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(config.api.basepath + `/contests`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`can't create contest`);
    }

    return await res.json() as EntityID;
}

export async function getContestProblem(cid: ID, charcode: string): Promise<ProblemDetailed> {
    const cookieStore = cookies();
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(config.api.basepath + `/contests/${cid}/problems/${charcode}`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get problem`);
    }

    return await res.json() as ProblemDetailed;
}

export async function getCreatedContests(): Promise<ContestList> {
    const cookieStore = cookies();
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(config.api.basepath + `/creator/contests`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get admin contests`);
    }

    return await res.json() as ContestList;
}

export async function createEntry(cid: ID): Promise<void> {
    const cookieStore = cookies();
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(config.api.basepath + `/contests/${cid}/entry`, {
        method: 'POST',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't apply for contest`);
    }
}

export async function getContestByID(cid: ID): Promise<ContestDetailed> {
    const cookieStore = cookies();
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(config.api.basepath + `/contests/${cid}`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get contest`);
    }

    return await res.json() as ContestDetailed;
}

export async function getLeaderboard(cid: ID): Promise<Leaderboard> {
    const cookieStore = cookies();
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(config.api.basepath + `/contests/${cid}/leaderboard`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get leaderboard`);
    }

    return await res.json() as Leaderboard;
}

export async function getAllContests(): Promise<ContestList> {
    const cookieStore = cookies();
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(config.api.basepath + `/contests`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get contests`);
    }

    return await res.json() as ContestList;
}
