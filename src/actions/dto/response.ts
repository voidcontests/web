export type Account = {
    id: number;
    ton_account: {
        address: {
            bounceable: string;
            non_bounceable: string;
            raw: string;
        };
        balance: number;
        status: string;
    };
    role: {
        name: string;
        created_problems_limit: number;
        created_contests_limit: number;
    };
};

export type EntityID = {
    id: number;
};

export type ContestList = {
    data: ContestListItem[];
};

export type ProblemList = {
    data: ProblemListItem[];
};

export type ContestDetailed = {
    id: number;
    creator: User;
    title: string;
    description: string;
    start_time: Date;
    end_time: Date;
    duration_mins: number;
    max_entries?: number;
    participants: number;
    allow_late_join: boolean;
    is_participant?: boolean;
    problems: ProblemListItem[];
    created_at: Date;
};

export type ProblemListItem = {
    id: number;
    charcode?: string;
    contest_id?: number;
    writer: User;
    title: string;
    difficulty: string;
    status?: 'accepted' | 'tried';
    created_at: Date;
};

export type ContestListItem = {
    id: number;
    creator: User;
    title: string;
    start_time: Date;
    end_time: Date;
    duration_mins: number;
    max_entries?: number;
    participants: number;
    created_at: Date;
};

export type SubmissionListItem = {
    id: number;
    problem_id: number;
    verdict: string;
    answer?: string;
    code?: string;
    testing_report?: {
        passed: number;
        total: number;
        stderr?: string;
        failed_test?: {
            input: string;
            expected_output: string;
            actual_output: string;
        },
    };
    created_at: Date;
};

export type User = {
    id: number;
    address: string;
};

export type ProblemDetailed = {
    id: number;
    charcode?: string;
    contest_id?: number;
    writer: User;
    kind: string;
    title: string;
    difficulty: string;
    statement: string;
    examples?: {
        input: string;
        output: string;
    }[];
    status?: 'accepted' | 'tried';
    time_limit_ms?: number;
    created_at: Date;
}


export type LeaderboardItem = {
    user_id: number;
    user_address: string;
    points: number;
}

export type Leaderboard = {
    data: LeaderboardItem[];
}
