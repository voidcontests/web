'use server';

import { z } from 'zod';
import { config } from '@/config';
import { FormData as CreateContestFormData } from '@/components/forms/create-contest';
import { ContestDetailed, ContestListItem, EntityID, LeaderboardItem, Pagination, ProblemDetailed } from '@/actions/models/response';
import { ID, fetchWithAuth, Result } from '.';
import { EntityIDSchema, ProblemDetailedSchema, ContestListItemSchema, PaginationSchema, ContestDetailedSchema, LeaderboardItemSchema } from './schemas';

export async function createContest(data: CreateContestFormData): Promise<Result<EntityID>> {
    return fetchWithAuth(`${config.api.basepath}/contests`,
        {
            method: 'POST',
            body: JSON.stringify(data),
        },
        EntityIDSchema
    );
}

export async function getContestProblem(cid: ID, charcode: string): Promise<Result<ProblemDetailed>> {
    return fetchWithAuth(`${config.api.basepath}/contests/${cid}/problems/${charcode}`,
        { method: 'GET' },
        ProblemDetailedSchema
    );
}

export async function getCreatedContests(): Promise<Result<Pagination<ContestListItem>>> {
    return fetchWithAuth(`${config.api.basepath}/creator/contests`,
        { method: 'GET' },
        PaginationSchema(ContestListItemSchema)
    );
}

export async function createEntry(cid: ID): Promise<void> {
    await fetchWithAuth(`${config.api.basepath}/contests/${cid}/entry`,
        { method: 'POST' },
        z.any()
    );
}

export async function getContestByID(cid: ID): Promise<Result<ContestDetailed>> {
    return fetchWithAuth(`${config.api.basepath}/contests/${cid}`,
        { method: 'GET' },
        ContestDetailedSchema
    );
}

export async function getLeaderboard(cid: ID): Promise<Result<Pagination<LeaderboardItem>>> {
    return fetchWithAuth(`${config.api.basepath}/contests/${cid}/leaderboard`,
        { method: 'GET' },
        PaginationSchema(LeaderboardItemSchema)
    );
}

export async function getAllContests(): Promise<Result<Pagination<ContestListItem>>> {
    return fetchWithAuth(`${config.api.basepath}/contests`,
        { method: 'GET' },
        PaginationSchema(ContestListItemSchema)
    );
}
