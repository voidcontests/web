'use server';

import { EntityID, ProblemDetailed, ProblemList } from "@/actions/dto/response";
import { FormData as CreateProblemFormData } from "@/components/forms/create-problem";
import { cookies } from "next/headers";
import { ID } from ".";
import { config } from "@/config";

export async function createProblem(data: CreateProblemFormData): Promise<EntityID> {
    const cookieStore = cookies();
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(config.api.basepath + `/problems`, {
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
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(config.api.basepath + `/creator/problems`, {
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
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(config.api.basepath + `/problems/${id}`, {
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
    const token = cookieStore.get(config.cookies.token_key)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    let body = {
        code: code,
    }

    const res = await fetch(config.api.basepath + `/run`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`can't get execute code`);
    }

    return await res.json() as ExecutionResult;
}
