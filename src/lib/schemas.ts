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

export const ContestProblemListItemSchema = z.object({
    id: z.number(),
    charcode: z.string(),
    writer: UserSchema,
    title: z.string(),
    difficulty: z.string(),
    status: z.string().optional(),
    time_limit_ms: z.number(),
    memory_limit_mb: z.number(),
    checker: z.string(),
    created_at: z.coerce.date(),
});

export const ContestProblemDetailedSchema = z.object({
    id: z.number(),
    charcode: z.string(),
    contest_id: z.number(),
    writer: UserSchema,
    title: z.string(),
    difficulty: z.string(),
    statement: z.string(),
    examples: z
        .array(z.object({ input: z.string(), output: z.string() }))
        .optional(),
    status: z.string().optional(),
    time_limit_ms: z.number(),
    memory_limit_mb: z.number(),
    checker: z.string(),
    submission_deadline: z.coerce.date().optional(),
    created_at: z.coerce.date(),
});

export const ContestProblemListSchema = z.object({
    data: z.array(ContestProblemListItemSchema),
});

export const ContestListItemSchema = z.object({
    id: z.number(),
    creator: UserSchema,
    title: z.string(),
    award_type: z.string(),
    entry_price_ton_nanos: z.number(),
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

export const PrizesSchema = z.object({
    ton_nanos: z.number(),
});

export const PaymentSchema = z.object({
  tx_hash: z.string(),
  created_at: z.coerce.date(),
});

export const EntrySchema = z.discriminatedUnion("is_paid", [
  z.object({
    is_admitted: z.boolean(),
    submission_deadline: z.coerce.date(),
    message: z.string().optional(),
    is_paid: z.literal(false),
    created_at: z.coerce.date(),
  }),
  z.object({
    is_admitted: z.boolean(),
    submission_deadline: z.coerce.date(),
    message: z.string().optional(),
    is_paid: z.literal(true),
    payment: PaymentSchema,
    created_at: z.coerce.date(),
  }),
]);

export const AwardsSchema = z.object({
    kind: z.string(),
    nanocoins: z.number(),
    is_distributed: z.boolean(),
});

export const ContestDetailedSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    creator: UserSchema,
    address: z.string().optional(),
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
    duration_mins: z.number(),
    participants: z.number(),
    max_entries: z.number().optional(),
    is_registration_open: z.boolean(),
    entry_price_ton_nanos: z.number(),
    entry: EntrySchema.optional(),
    awards: AwardsSchema,
    problems: z.array(ContestProblemListItemSchema),
    created_at: z.coerce.date(),
});

export const Test = z.object({
    input: z.string(),
    expected_output: z.string(),
    actual_output: z.string(),
});

export const TestingReport = z.object({
    id: z.number(),
    passed_tests_count: z.number(),
    total_tests_count: z.number(),
    failed_test: Test.optional(),
    stderr: z.string().optional(),
    created_at: z.coerce.date(),
});

export const SubmissionSchema = z.object({
    id: z.number(),
    problem_id: z.number(),
    status: z.string(),
    verdict: z.string(),
    code: z.string().optional(),
    language: z.string().optional(),
    testing_report: TestingReport.optional(),
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

export const ErrorSchema = z.object({
    message: z.string(),
    timeout: z.string().optional(),
});

export const ProblemListItemSchema = z.object({
    id: z.number(),
    writer: UserSchema,
    title: z.string(),
    difficulty: z.string(),
    time_limit_ms: z.number(),
    memory_limit_mb: z.number(),
    checker: z.string(),
    created_at: z.coerce.date(),
});

export const ProblemDetailedSchema = z.object({
    id: z.number(),
    writer: UserSchema,
    title: z.string(),
    difficulty: z.string(),
    statement: z.string(),
    examples: z
        .array(z.object({ input: z.string(), output: z.string() }))
        .optional(),
    time_limit_ms: z.number(),
    memory_limit_mb: z.number(),
    checker: z.string(),
    created_at: z.coerce.date(),
});

export const ProblemListSchema = z.object({
    data: z.array(ProblemListItemSchema),
});
