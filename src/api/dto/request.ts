export type CreateContest = {
    title: string;
    description?: string;
    problems: CreateProblem[];
    starting_at: Date;
    duration_mins: number;
};

export type CreateProblem = {
    title: string;
    statement: string;
    difficulty: string;
    input?: string;
    answer: string;
};

export type CreateSubmission = {
    answer: string;
};