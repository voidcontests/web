'use server';

import { EntityID, ProblemDetailed, ProblemList } from "@/actions/dto/response";
import { FormData as CreateProblemFormData } from "@/components/forms/create-problem";
import { cookies } from "next/headers";
import { BASEPATH, COOKIE_KEY, ID } from ".";

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

export async function getCreatedProblems(): Promise<ProblemList> {
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

export async function getProblemByID(id: ID): Promise<ProblemDetailed> {
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

export type ExecutionResult = {
    status: number;
    stdout: string;
    stderr: string;
};

export async function executeSolution(code: string): Promise<ExecutionResult> {
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
