import { Separator } from "@/components/ui/separator";
import { ContestDetailed } from "@/api/dto/response";
import Preview from "@/components/preview";
import { use } from "react";

export default function ContestInfo({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-bright-text text-4xl font-medium">
                {cdetailed.title}
            </h1>
            <Separator />
            <Preview markdown={cdetailed.description} />
        </div>
    );
}