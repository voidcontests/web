import { Currency } from "lucide-react";
import AmpersandsVisual from "./ampersands-visual";
import Link from "next/link";

export default function PublicCompetitionsCard() {
    return (
        <Link href="/contests" className="col-span-3">
            <div className="p-5 rounded-xl bg-surface border not-dark:shadow-md flex flex-col justify-between text-sm h-84 group hover:border-blue-400 hover:cursor-pointer transition-colors duration-300">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Currency className="w-4 h-4" />
                        <h2 className="text-base">Public Competitions</h2>
                    </div>
                    <p className="text-secondary-foreground max-w-60">
                        Join <span className="text-foreground">tons of public coding contests</span> - sharpen your skills in free challenges.
                    </p>
                </div>
                <div className="w-full flex justify-end">
                    <AmpersandsVisual />
                </div>
            </div>
        </Link>
    );
}
