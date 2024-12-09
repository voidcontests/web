import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-[calc(100vh-150px)] w-full flex flex-col gap-4 justify-center items-center">
            <h1 className="text-4xl text-foreground font-semibold">
                {'ERROR: {404}'}
            </h1>
            <div className="text-muted-foreground text-xl md-[5px]">
                Page you are looking for doesn't exists
            </div>
            <Link href="/">
                <Button variant="outline">
                    GO HOME <ArrowRight />
                </Button>
            </Link>
        </div>
    );
}
