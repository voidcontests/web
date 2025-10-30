import { ContestDetailed } from "@/lib/models";

export default function Overview({ contest }: { contest: ContestDetailed }) {
    return (
        <div className="border rounded-xl bg-surface p-5 flex flex-col gap-2 not-dark:shadow-md">
            <h1 className="text-foreground text-xl font-medium">
                {contest.title}
            </h1>
            {
                contest.description.trim().length !== 0
                    ? <span className="text-sm">{contest.description}</span>
                    : <span className="italic text-sm text-secondary-foreground">No description</span>
            }
        </div>
    );
}
