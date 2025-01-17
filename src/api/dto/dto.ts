export interface CreateContestRequest {
    title: string;
    description: string;
    problems: CreateProblemRequest[];
    starting_at: string;
    duration_mins: number;
    is_draft: boolean;
}

export interface CreateProblemRequest {
    title: string;
    statement: string;
    difficulty: string;
    input: string;
    answer: string;
}

export interface ContestResponse {
    id: string;
    title: string;
    description: string;
    creator_address: string;
    starting_at: Date;
    duration_mins: number;
    is_draft: boolean;
    created_at: Date;
}

export interface ContestDetailedResponse {
    id: string;
    title: string;
    description: string;
    problems: ProblemResponse[],
    creator_address: string;
    starting_at: Date;
    duration_mins: number;
    is_draft: boolean;
    created_at: Date;
}

export interface ProblemResponse {
    id: number;
    contest_id: number;
    title: string;
    difficulty: string;
    writer_address: string;
}