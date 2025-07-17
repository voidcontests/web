import KeyboardVisual from "./keyboard-visual";
import { Cannabis } from "lucide-react";
import Link from "next/link";

export default function HostCard() {
    return (
        <Link href="/hub" className="col-span-3">
            <div className="col-span-3 rounded-xl bg-surface border not-dark:shadow-md flex flex-col justify-between text-sm h-84 max-sm:h-fit group hover:border-blue-400 hover:cursor-pointer transition-colors duration-300 overflow-hidden">
                <div className="m-5 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Cannabis className="size-4" />
                        <h2 className="text-base">Host a Competition</h2>
                    </div>
                    <p className="text-secondary-foreground sm:max-w-60">
                        You can create <span className="text-foreground">up to 5 own contests.</span> Bring your best ideas to life.
                    </p>
                </div>
                <div className="w-full flex justify-end pb-5 max-sm:hidden">
                    <KeyboardVisual />
                </div>
            </div>
        </Link>
    );
}
