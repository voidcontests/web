import { Spinner } from "@/ui/spinner";

export default function Loading() {
    return (
        <div className="flex flex-row gap-2 text-secondary-foreground justify-center items-center mt-[37vh]">
            <Spinner className="size-4" />
            <span className="text-lg">
                Loading...
            </span>
        </div>
    );
}
