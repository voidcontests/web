'use server';

import { Account } from "@/actions/dto/response";
import { BASEPATH, COOKIE_KEY } from ".";
import { cookies } from "next/headers";

export async function create() {}

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
