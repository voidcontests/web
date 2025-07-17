'use server';

import { fetchWithAuth, fetchWithSchema, Result } from '.';
import { config } from '@/config';
import { Account, EntityID, Token } from '@/actions/models/response';
import { FormData as SignInFormData } from '@/components/forms/sign-in';
import { FormData as SignUpFormData } from '@/components/forms/sign-up';
import { AccountSchema, EntityIDSchema, TokenSchema } from './schemas';

export async function createSession(data: SignInFormData): Promise<Result<Token>> {
    return fetchWithSchema(config.api.basepath + '/session',
        {
            method: 'POST',
            body: JSON.stringify(data),
        }, TokenSchema
    );
}

export async function createAccount(data: SignUpFormData): Promise<Result<EntityID>> {
	return await fetchWithAuth(config.api.basepath + '/account',
		{
			method: 'POST',
			body: JSON.stringify(data),
		},
		EntityIDSchema
	);
}

export async function getAccount(): Promise<Result<Account>> {
	return await fetchWithAuth(config.api.basepath + '/account',
		{
			method: 'GET',
		},
		AccountSchema
	);
}
