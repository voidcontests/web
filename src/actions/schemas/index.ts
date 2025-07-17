import { z } from 'zod';

export const EntityIDSchema = z.object({
    id: z.number(),
});

export const TokenSchema = z.object({
    token: z.string(),
});

export const MetaSchema = z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    has_next: z.boolean(),
    has_prev: z.boolean(),
});

export const PaginationSchema = <T extends z.ZodTypeAny>(item: T) =>
    z.object({
        meta: MetaSchema,
        items: z.array(item),
    });

export const UserSchema = z.object({
    id: z.number(),
    username: z.string(),
});

export const AccountSchema = z.object({
    id: z.number(),
    username: z.string(),
    role: z.object({
        name: z.string(),
        created_problems_limit: z.number(),
        created_contests_limit: z.number(),
    }),
});

export const ProblemListItemSchema = z.object({
    id: z.number(),
    charcode: z.string().optional(),
    contest_id: z.number().optional(),
    writer: UserSchema,
    title: z.string(),
    difficulty: z.string(),
    status: z.enum(['accepted', 'tried']).optional(),
    created_at: z.coerce.date(),
});

export const ProblemDetailedSchema = z.object({
    id: z.number(),
    charcode: z.string(),
    contest_id: z.number(),
    writer: UserSchema,
    kind: z.string(),
    title: z.string(),
    difficulty: z.string(),
    statement: z.string(),
    examples: z
        .array(z.object({ input: z.string(), output: z.string() }))
        .optional(),
    status: z.enum(['accepted', 'tried']).optional(),
    time_limit_ms: z.number().optional(),
    created_at: z.coerce.date(),
});

export const ProblemListSchema = z.object({
    data: z.array(ProblemListItemSchema),
});

export const ContestListItemSchema = z.object({
    id: z.number(),
    creator: UserSchema,
    title: z.string(),
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
    duration_mins: z.number(),
    max_entries: z.number().optional(),
    participants: z.number(),
    created_at: z.coerce.date(),
});

export const ContestListSchema = z.object({
    data: z.array(ContestListItemSchema),
});

export const ContestDetailedSchema = z.object({
    id: z.number(),
    creator: UserSchema,
    title: z.string(),
    description: z.string(),
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
    duration_mins: z.number(),
    max_entries: z.number().optional(),
    participants: z.number(),
    allow_late_join: z.boolean(),
    is_participant: z.boolean().optional(),
    problems: z.array(ProblemListItemSchema),
    created_at: z.coerce.date(),
});

export const SubmissionSchema = z.object({
    id: z.number(),
    problem_id: z.number(),
    problem_kind: z.string(),
    verdict: z.string(),
    answer: z.string().optional(),
    code: z.string().optional(),
    language: z.string().optional(),
    testing_report: z
        .object({
            passed: z.number(),
            total: z.number(),
            stderr: z.string().optional(),
            failed_test: z
                .object({
                    input: z.string(),
                    expected_output: z.string(),
                    actual_output: z.string(),
                })
                .optional(),
        })
        .optional(),
    created_at: z.coerce.date(),
});

export const SubmissionsListSchema = z.object({
    data: z.array(SubmissionSchema),
});

export const LeaderboardItemSchema = z.object({
    user_id: z.number(),
    username: z.string(),
    points: z.number(),
});

export const LeaderboardSchema = z.object({
    data: z.array(LeaderboardItemSchema),
});

export const ExecutionResultSchema = z.object({
	status: z.number(),
	stdout: z.string(),
	stderr: z.string(),
});

export const ErrorSchema = z.object({
    message: z.string(),
    timeout: z.string().optional(),
});
