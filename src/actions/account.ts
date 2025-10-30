'use server';

import { config } from '@/config';
import { fetchWithSchema } from '@/lib/client';
import { AccountSchema } from '@/lib/schemas';
import { Account } from '@/lib/models';
import { Result } from '@/lib/api';
import { cookies } from 'next/headers';

export async function fetchAccount(): Promise<Result<Account>> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    return fetchWithSchema(
        `${config.api.basepath}/account`,
        {
            method: 'GET',
            cache: 'no-store'
        },
        AccountSchema,
        token
    );
}
