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