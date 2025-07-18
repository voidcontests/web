import {
    AccountSchema,
    ContestDetailedSchema,
    ContestListItemSchema,
    ContestListSchema,
    EntityIDSchema,
    ErrorSchema,
    LeaderboardItemSchema,
    LeaderboardSchema,
    MetaSchema,
    PaginationSchema,
    ProblemDetailedSchema,
    ProblemListItemSchema,
    SubmissionSchema,
    SubmissionsListSchema,
    TokenSchema,
    UserSchema,
} from "@/actions/schemas";
import z from "zod";

export type Pagination<T> = z.infer<ReturnType<typeof PaginationSchema<z.ZodType<T>>>>;
export type Meta = z.infer<typeof MetaSchema>;

export type EntityID = z.infer<typeof EntityIDSchema>;
export type Token = z.infer<typeof TokenSchema>;

export type Account = z.infer<typeof AccountSchema>;
export type User = z.infer<typeof UserSchema>;

export type ContestList = z.infer<typeof ContestListSchema>;
export type ContestListItem = z.infer<typeof ContestListItemSchema>;
export type ContestDetailed = z.infer<typeof ContestDetailedSchema>;

export type ProblemList = z.infer<typeof ProblemListItemSchema>;
export type ProblemListItem = z.infer<typeof ProblemListItemSchema>;
export type ProblemDetailed = z.infer<typeof ProblemDetailedSchema>;

export type SubmissionsList = z.infer<typeof SubmissionsListSchema>;
export type Submission = z.infer<typeof SubmissionSchema>;

export type Leaderboard = z.infer<typeof LeaderboardSchema>;
export type LeaderboardItem = z.infer<typeof LeaderboardItemSchema>;

export type Error = z.infer<typeof ErrorSchema>;
