import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-[35vh]">
            <h1 className="text-4xl text-primary-text font-semibold leading-none">
                {'ERROR: {404}'}
            </h1>
            <div className="text-xl text-muted-text">
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
