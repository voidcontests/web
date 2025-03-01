export type CreateContest = {
    title: string;
    description?: string;
    problems: CreateProblem[];
    start_time: Date;
    end_time: Date;
    duration_mins: number;
    max_entries: number;
    allow_late_join: boolean;
    keep_as_training: boolean;
};

export type CreateProblem = {
    title: string;
    statement: string;
    difficulty: string;
    input?: string;
    answer: string;
};

export type CreateSubmission = {
    problem_kind: string;
    answer?: string;
    code?: string;
};
