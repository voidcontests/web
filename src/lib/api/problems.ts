import { config } from '@/config';
import { ID, fetchWithAuth, Result } from '@/lib/client';
import {
    EntityIDSchema,
    PaginationSchema,
    ProblemDetailedSchema,
    ProblemListItemSchema,
    SubmissionSchema,
} from '@/lib/schemas';
import {
    Pagination,
    EntityID,
    ContestProblemDetailed,
    Submission,
    ProblemListItem,
    ProblemDetailed,
} from '@/lib/models';

export type CreateProblemFormData = {
    title: string;
    statement: string;
    difficulty: string;
    kind: string;
    time_limit_ms: number;
    examples?: Array<{ input: string; output: string }>;
    answer?: string;
    test_cases?: Array<{ input: string; output: string }>;
};

export async function createProblem(data: CreateProblemFormData): Promise<Result<EntityID>> {
    return fetchWithAuth(
        `${config.api.basepath}/problems`,
        {
            method: 'POST',
            body: JSON.stringify(data),
        },
        EntityIDSchema
    );
}

export async function getCreatedProblems(
    offset: number,
    limit: number
): Promise<Result<Pagination<ProblemListItem>>> {
    return fetchWithAuth(
        `${config.api.basepath}/creator/problems?offset=${offset}&limit=${limit}`,
        {
            method: 'GET',
        },
        PaginationSchema(ProblemListItemSchema)
    );
}

export async function getProblemByID(id: ID): Promise<Result<ProblemDetailed>> {
    return fetchWithAuth(
        `${config.api.basepath}/problems/${id}`,
        {
            method: 'GET',
        },
        ProblemDetailedSchema
    );
}

export async function getProblemSubmissions(
    contestID: ID,
    charcode: string,
    offset: number,
    limit: number
): Promise<Result<Pagination<Submission>>> {
    return fetchWithAuth(
        `${config.api.basepath}/contests/${contestID}/problems/${charcode}/submissions?offset=${offset}&limit=${limit}`,
        {
            method: 'GET',
        },
        PaginationSchema(SubmissionSchema)
    );
}

export async function submitTextAnswer(
    contestID: ID,
    charcode: string,
    answer: string
): Promise<Result<Submission>> {
    return fetchWithAuth(
        `${config.api.basepath}/contests/${contestID}/problems/${charcode}/submissions`,
        {
            method: 'POST',
            body: JSON.stringify({ problem_kind: 'text_answer_problem', answer }),
        },
        SubmissionSchema
    );
}

export async function submitCodeSolution(
    contestID: ID,
    charcode: string,
    code: string,
    language: string
): Promise<Result<Submission>> {
    return fetchWithAuth(
        `${config.api.basepath}/contests/${contestID}/problems/${charcode}/submissions`,
        {
            method: 'POST',
            body: JSON.stringify({ problem_kind: 'coding_problem', code, language }),
        },
        SubmissionSchema
    );
}

export async function getSubmissionByID(submissionID: ID): Promise<Result<Submission>> {
    return fetchWithAuth(
        `${config.api.basepath}/submissions/${submissionID}`,
        {
            method: 'GET',
        },
        SubmissionSchema
    );
}
