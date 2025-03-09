'use server';

//
// NOTE:
// if server-action don't use server API like `cookies` from 'next/headers'
// next.js decides to do actual request only once (at build time). it leads to
// kinda 'statical' pages, that are even not marked as static in build logs.
//

import { Account, ContestDetailed, ContestList, EntityID, Leaderboard, ProblemDetailed, ProblemList } from "@/actions/dto/response";
import { FormData as CreateProblemFormData } from "@/components/forms/create-problem";
import { FormData as CreateContestFormData } from "@/components/forms/create-contest";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { DOMAIN } from "@/config";

type ID = string | number;

const BASEPATH = `${DOMAIN}/api`;
const COOKIE_KEY = 'token';

export type ExecutionResult = {
    status: number;
    stdout: string;
    stderr: string;
};

export async function execute(code: string): Promise<ExecutionResult> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    let body = {
        code: code,
    }

    const res = await fetch(BASEPATH + `/run`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`can't get execute code`);
    }

    return await res.json() as ExecutionResult;
}

export async function createEntry(cid: ID): Promise<void> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/contests/${cid}/entry`, {
        method: 'POST',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't apply for contest`);
    }
}

export async function getAccount(): Promise<Account> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // TODO: unhardcode mainnet id out of here
    const res = await fetch(BASEPATH + `/account?network=-239`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get current account`);
    }

    return await res.json() as Account;
}

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

export async function createContest(data: CreateContestFormData): Promise<EntityID> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/contests`, {
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

export async function getProblemArchive(): Promise<ProblemList> {
    cookies();

    const headers = {
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/problems`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get archived problems`);
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

export async function getLeaderboard(cid: ID): Promise<Leaderboard> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/contests/${cid}/leaderboard`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get leaderboard`);
    }

    return await res.json() as Leaderboard;
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

export async function getProblem(id: ID): Promise<ProblemDetailed> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/problems/${id}`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get problem`);
    }

    return await res.json() as ProblemDetailed;
}

export async function revalidate(path: string) {
    revalidatePath(path);
}
