import { z } from 'zod';
import { config } from '@/config';
import { ID, fetchWithAuth, Result } from '@/lib/client';
import {
    EntityIDSchema,
    ContestProblemDetailedSchema,
    ContestListItemSchema,
    PaginationSchema,
    ContestDetailedSchema,
    LeaderboardItemSchema,
} from '@/lib/schemas';
import {
    ContestDetailed,
    ContestListItem,
    EntityID,
    LeaderboardItem,
    Pagination,
    ContestProblemDetailed,
} from '@/lib/models';

export type CreateContestFormData = {
    title: string;
    description?: string;
    problems_ids: number[];
    start_time: Date;
    end_time: Date;
    max_entries: number;
    allow_late_join: boolean;
};

export async function createContest(data: CreateContestFormData): Promise<Result<EntityID>> {
    return fetchWithAuth(
        `${config.api.basepath}/contests`,
        {
            method: 'POST',
            body: JSON.stringify(data),
        },
        EntityIDSchema
    );
}

export async function getContestProblem(
    cid: ID,
    charcode: string
): Promise<Result<ContestProblemDetailed>> {
    return fetchWithAuth(
        `${config.api.basepath}/contests/${cid}/problems/${charcode}`,
        { method: 'GET' },
        ContestProblemDetailedSchema
    );
}

export async function getCreatedContests(
    offset: number,
    limit: number
): Promise<Result<Pagination<ContestListItem>>> {
    return fetchWithAuth(
        `${config.api.basepath}/creator/contests?offset=${offset}&limit=${limit}`,
        { method: 'GET' },
        PaginationSchema(ContestListItemSchema)
    );
}

export async function createEntry(cid: ID): Promise<void> {
    await fetchWithAuth(
        `${config.api.basepath}/contests/${cid}/entry`,
        { method: 'POST' },
        z.any()
    );
}

export async function getContestByID(cid: ID): Promise<Result<ContestDetailed>> {
    return fetchWithAuth(
        `${config.api.basepath}/contests/${cid}`,
        { method: 'GET' },
        ContestDetailedSchema
    );
}

export async function getLeaderboard(
    cid: ID
): Promise<Result<Pagination<LeaderboardItem>>> {
    return fetchWithAuth(
        `${config.api.basepath}/contests/${cid}/leaderboard`,
        { method: 'GET' },
        PaginationSchema(LeaderboardItemSchema)
    );
}

export async function getAllContests(
    offset: number,
    limit: number
): Promise<Result<Pagination<ContestListItem>>> {
    return fetchWithAuth(
        `${config.api.basepath}/contests?offset=${offset}&limit=${limit}`,
        { method: 'GET' },
        PaginationSchema(ContestListItemSchema)
    );
}
