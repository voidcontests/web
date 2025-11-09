'use server';

import { cookies } from 'next/headers';
import { config } from '@/config';

import { PaginationSchema, ContestListItemSchema, ContestDetailedSchema, ContestProblemDetailedSchema, EntrySchema, LeaderboardItemSchema } from '@/lib/schemas';
import { Pagination, ContestListItem, ContestDetailed, ContestProblemDetailed, Entry, LeaderboardItem } from '@/lib/models';
import { fetchWithSchema } from '@/lib/client';
import { Result } from '@/lib/api';

export async function fetchAllContests(offset: number, limit: number): Promise<Result<Pagination<ContestListItem>>> {
    return fetchWithSchema(
        `${config.api.basepath}/contests?offset=${offset}&limit=${limit}`,
        {
            method: 'GET',
            cache: 'no-store'
        },
        PaginationSchema(ContestListItemSchema)
    );
}

export async function fetchContestByID(contestID: string): Promise<Result<ContestDetailed>> {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    return fetchWithSchema(
        `${config.api.basepath}/contests/${contestID}`,
        {
            method: 'GET',
            cache: 'no-store'
        },
        ContestDetailedSchema,
        token
    );
}

export async function fetchContestProblem(contestID: string, charcode: string): Promise<Result<ContestProblemDetailed>> {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    return fetchWithSchema(
        `${config.api.basepath}/contests/${contestID}/problems/${charcode}`,
        {
            method: 'GET',
            cache: 'no-store'
        },
        ContestProblemDetailedSchema,
        token
    );
}

export async function fetchScores(contestID: string): Promise<Result<Pagination<LeaderboardItem>>> {
    return fetchWithSchema(
        `${config.api.basepath}/contests/${contestID}/scores`,
        {
            method: 'GET',
            cache: 'no-store'
        },
        PaginationSchema(LeaderboardItemSchema)
    );
}
