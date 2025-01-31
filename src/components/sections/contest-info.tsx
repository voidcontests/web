import { Separator } from "@/components/ui/separator";
import { ContestDetailed } from "@/api/dto/response";
import Preview from "@/components/preview";
import { use } from "react";

export default function ContestInfo({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    return (
        <div className="border rounded-xl bg-secondary p-5 flex flex-col gap-4">
            <h1 className="text-bright-text text-xl font-medium">
                {cdetailed.title}
            </h1>
            <div>
                {cdetailed.description}
            </div>
        </div>
    );
}
