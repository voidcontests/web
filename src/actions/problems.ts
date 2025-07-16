'use server';

import { Pagination, EntityID, ProblemDetailed, Submission, ProblemListItem, ExecutionResult } from '@/actions/models/response';
import { EntityIDSchema, ExecutionResultSchema, PaginationSchema, ProblemDetailedSchema, ProblemListItemSchema, SubmissionSchema } from '@/actions/schemas';
import { FormData as CreateProblemFormData } from '@/components/forms/create-problem';
import { ID, fetchWithAuth } from '.';
import { config } from '@/config';

export async function createProblem(data: CreateProblemFormData): Promise<EntityID> {
	return fetchWithAuth(`${config.api.basepath}/problems`, {
		method: 'POST',
		body: JSON.stringify(data),
	}, EntityIDSchema);
}

export async function getCreatedProblems(): Promise<Pagination<ProblemListItem>> {
	return fetchWithAuth(`${config.api.basepath}/creator/problems`, {
		method: 'GET',
	}, PaginationSchema(ProblemListItemSchema));
}

export async function getProblemByID(id: ID): Promise<ProblemDetailed> {
	return fetchWithAuth(`${config.api.basepath}/problems/${id}`, {
		method: 'GET',
	}, ProblemDetailedSchema);
}

export async function executeSolution(code: string): Promise<ExecutionResult> {
	return fetchWithAuth(`${config.api.basepath}/run`, {
		method: 'POST',
		body: JSON.stringify({ code }),
	}, ExecutionResultSchema);
}

export async function getProblemSubmissions(contestID: ID, charcode: string, limit: number): Promise<Pagination<Submission>> {
	return fetchWithAuth(`${config.api.basepath}/contests/${contestID}/problems/${charcode}/submissions?limit=${limit}`,
		{ method: 'GET' },
		PaginationSchema(SubmissionSchema)
	);
}
