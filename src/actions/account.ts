'use server';

import { fetchWithAuth } from '.';
import { config } from '@/config';
import { Account, EntityID, Token } from '@/actions/models/response';
import { FormData as SignInFormData } from '@/components/forms/sign-in';
import { FormData as SignUpFormData } from '@/components/forms/sign-up';
import { AccountSchema, EntityIDSchema, TokenSchema } from './schemas';

export async function createSession(data: SignInFormData): Promise<Token> {
	const res = await fetch(config.api.basepath + '/session', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		const err = await res.text();
		throw new Error(`Can't create session: ${res.status} ${err}`);
	}

	const json = await res.json();
	const parsed = TokenSchema.safeParse(json);
	if (!parsed.success) {
		throw new Error(`Invalid session token response: ${parsed.error}`);
	}

	return parsed.data;
}

export async function createAccount(data: SignUpFormData): Promise<EntityID> {
	return await fetchWithAuth(config.api.basepath + '/account',
		{
			method: 'POST',
			body: JSON.stringify(data),
		},
		EntityIDSchema
	);
}

export async function getAccount(): Promise<Account> {
	return await fetchWithAuth(config.api.basepath + '/account',
		{
			method: 'GET',
		},
		AccountSchema
	);
}
