export type ContestID = {
    id: number;
};

export type ContestDetailed = {
    id: number;
    creator: User;
    title: string;
    description: string;
    starting_at: Date;
    duration_mins: number;
    is_draft?: boolean;
    is_participant?: boolean;
    problems: ProblemListItem[];
};

export type ProblemListItem = {
    id: number;
    contest_id: number;
    writer: User;
    title: string;
    difficulty: string;
    status?: string;
};

export type ContestListItem = {
    id: number;
    creator: User;
    title: string;
    starting_at: Date;
    duration_mins: number;
};

export type SubmissionListItem = {
    id: number;
    problem_id: number;
    verdict: string;
    created_at: Date;
};

export type User = {
    id: number;
    address: string;
};