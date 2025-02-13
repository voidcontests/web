export type ContestID = {
    id: number;
};

export type ContestList = {
    data: ContestListItem[];
};

export type ContestDetailed = {
    id: number;
    creator: User;
    title: string;
    description: string;
    start_time: Date;
    end_time: Date;
    duration_mins: number;
    participants: number;
    is_draft?: boolean;
    is_participant?: boolean;
    problems: ProblemListItem[];
};

export type ProblemListItem = {
    id: number;
    charcode: string;
    contest_id: number;
    writer: User;
    title: string;
    difficulty: string;
    status?: 'accepted' | 'tried';
};

export type ContestListItem = {
    id: number;
    creator: User;
    title: string;
    start_time: Date;
    end_time: Date;
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

export type ProblemDetailed = {
    id: number;
    charcode: string;
    contest_id: number;
    writer: User;
    title: string;
    statement: string;
    difficulty: string;
    status?: 'accepted' | 'tried';
    input?: string;
}
