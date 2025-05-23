'use server';

import { Account, EntityID, Token } from "@/actions/dto/response";
import { BASEPATH, COOKIE_KEY } from ".";
import { cookies } from "next/headers";
import { FormData as SignInFormData } from "@/components/forms/login";
import { FormData as SignUpFormData } from "@/components/forms/create-account";

export async function createSession(data: SignInFormData): Promise<Token> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/session`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`can't create session`);
    }

    return await res.json() as Token;
}

export async function createAccount(data: SignUpFormData): Promise<EntityID> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(BASEPATH + `/account`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`can't create account`);
    }

    return await res.json() as EntityID;
}

export async function getAccount(): Promise<Account> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_KEY)?.value;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // TODO: unhardcode mainnet id out of here
    const res = await fetch(BASEPATH + `/account`, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        throw new Error(`can't get current account`);
    }

    return await res.json() as Account;
}
