import { config } from '@/config';
import { fetchWithAuth, fetchWithSchema, Result, setToken } from '@/lib/client';
import { AccountSchema, EntityIDSchema, TokenSchema } from '@/lib/schemas';
import { Account, EntityID, Token } from '@/lib/models';

export type SignInFormData = {
    username: string;
    password: string;
};

export type SignUpFormData = {
    username: string;
    password: string;
};

export async function createSession(data: SignInFormData): Promise<Result<Token>> {
    const result = await fetchWithSchema(
        config.api.basepath + '/session',
        {
            method: 'POST',
            body: JSON.stringify(data),
        },
        TokenSchema
    );

    // If successful, save the token
    if (result.ok) {
        setToken(result.data.token);
    }

    return result;
}

export async function createAccount(data: SignUpFormData): Promise<Result<EntityID>> {
    return await fetchWithAuth(
        config.api.basepath + '/account',
        {
            method: 'POST',
            body: JSON.stringify(data),
        },
        EntityIDSchema
    );
}

export async function getAccount(): Promise<Result<Account>> {
    return await fetchWithAuth(
        config.api.basepath + '/account',
        {
            method: 'GET',
        },
        AccountSchema
    );
}
