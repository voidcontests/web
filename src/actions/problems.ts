'use server';

import { cookies } from 'next/headers';
import { config } from '@/config';

import { PaginationSchema, ProblemListItemSchema } from '@/lib/schemas';
import { Pagination, ProblemListItem } from '@/lib/models';
import { fetchWithSchema } from '@/lib/client';
import { Result } from '@/lib/api';

export async function fetchCreatedProblems(offset: number, limit: number): Promise<Result<Pagination<ProblemListItem>>> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    return fetchWithSchema(
        `${config.api.basepath}/account/problems?offset=${offset}&limit=${limit}`,
        {
            method: 'GET',
            cache: 'no-store'
        },
        PaginationSchema(ProblemListItemSchema),
        token
    );
}
