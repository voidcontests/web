'use server';

import { Pagination, EntityID, ProblemDetailed, Submission, ProblemListItem, ExecutionResult } from '@/actions/models/response';
import { EntityIDSchema, ExecutionResultSchema, PaginationSchema, ProblemDetailedSchema, ProblemListItemSchema, SubmissionSchema } from '@/actions/schemas';
import { FormData as CreateProblemFormData } from '@/components/forms/create-problem';
import { ID, fetchWithAuth, Result } from '.';
import { config } from '@/config';

export async function createProblem(data: CreateProblemFormData): Promise<Result<EntityID>> {
	return fetchWithAuth(`${config.api.basepath}/problems`, {
		method: 'POST',
		body: JSON.stringify(data),
	}, EntityIDSchema);
}

export async function getCreatedProblems(): Promise<Result<Pagination<ProblemListItem>>> {
	return fetchWithAuth(`${config.api.basepath}/creator/problems`, {
		method: 'GET',
	}, PaginationSchema(ProblemListItemSchema));
}

export async function getProblemByID(id: ID): Promise<Result<ProblemDetailed>> {
	return fetchWithAuth(`${config.api.basepath}/problems/${id}`, {
		method: 'GET',
	}, ProblemDetailedSchema);
}

export async function executeSolution(code: string): Promise<Result<ExecutionResult>> {
	return fetchWithAuth(`${config.api.basepath}/run`, {
		method: 'POST',
		body: JSON.stringify({ code }),
	}, ExecutionResultSchema);
}

export async function getProblemSubmissions(contestID: ID, charcode: string, limit: number): Promise<Result<Pagination<Submission>>> {
	return fetchWithAuth(`${config.api.basepath}/contests/${contestID}/problems/${charcode}/submissions?limit=${limit}`, {
	    method: 'GET'
	}, PaginationSchema(SubmissionSchema));
}

export async function submitTextAnswer(contestID: ID, charcode: string, answer: string): Promise<Result<Submission>> {
    return fetchWithAuth(`${config.api.basepath}/contests/${contestID}/problems/${charcode}/submissions`, {
        method: 'POST',
        body: JSON.stringify({ problem_kind: 'text_answer_problem', answer }),
    }, SubmissionSchema);
}

export async function submitCodeSolution(contestID: ID, charcode: string, code: string, language: string): Promise<Result<Submission>> {
    return fetchWithAuth(`${config.api.basepath}/contests/${contestID}/problems/${charcode}/submissions`, {
        method: 'POST',
        body: JSON.stringify({ problem_kind: 'coding_problem', code, language }),
    }, SubmissionSchema);
}

export async function getSubmissionByID(submissionID: ID): Promise<Result<Submission>> {
	return fetchWithAuth(`${config.api.basepath}/submissions/${submissionID}`, {
	    method: 'GET'
	}, SubmissionSchema);
}
