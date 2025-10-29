import { config } from '@/config';
import { ID, Result } from '@/lib/client';
import { ContestDetailedSchema } from '@/lib/schemas';
import { ContestDetailed } from '@/lib/models';
import { serverFetchWithAuth } from '@/lib/server-client';

/**
 * Server-side function to get contest by ID
 */
export async function getContestByIDServer(cid: ID): Promise<Result<ContestDetailed>> {
    return serverFetchWithAuth(
        `${config.api.basepath}/contests/${cid}`,
        { method: 'GET' },
        ContestDetailedSchema
    );
}
