import { ContestDetailed } from "@/actions/models/response";
import { use } from "react";
import { Result } from "@/actions";

export default function ContestInfo({ contest }: { contest: Promise<Result<ContestDetailed>> }) {
    const result = use(contest);
    if (!result.ok) {
        throw new Error(`Fetch contest information failed: ${result.error.message}`);
    }

    const cdetailed = result.data;

    return (
        <div className="border rounded-xl bg-surface p-5 flex flex-col gap-2 not-dark:shadow-md">
            <h1 className="text-foreground text-xl font-medium">
                {cdetailed.title}
            </h1>
            {
                cdetailed.description.trim().length !== 0
                    ? <span className="text-sm">{cdetailed.description}</span>
                    : <span className="italic text-sm text-secondary-foreground">No description</span>
            }
        </div>
    );
}
