import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Soon() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-[35vh]">
            <h1 className="text-4xl text-foreground font-semibold leading-none">
                SOOOOOON...
            </h1>
            <div className="text-xl text-tertiary-foreground">
                This section is not available yet
            </div>
            <Link href="/">
                <Button variant="outline">
                    GO HOME <ArrowRight />
                </Button>
            </Link>
        </div>
    );
}
