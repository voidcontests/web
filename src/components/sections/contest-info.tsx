import { ContestDetailed } from "@/api/dto/response";
import { use } from "react";

export default function ContestInfo({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    return (
        <div className="border rounded-xl bg-surface p-5 flex flex-col gap-2 not-dark:shadow-md">
            <h1 className="text-foreground text-xl font-medium">
                {cdetailed.title}
            </h1>
            <div>
                {cdetailed.description}
            </div>
        </div>
    );
}
