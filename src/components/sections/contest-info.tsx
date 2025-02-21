import { ContestDetailed } from "@/actions/dto/response";
import { use } from "react";

export default function ContestInfo({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

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
