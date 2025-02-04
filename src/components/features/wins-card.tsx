import { Check, Coins } from "lucide-react";
import CentVisual from "./cent-visual";

export default function WinsCard() {
    return (
        <div className="col-span-6 p-5 rounded-xl bg-surface border not-dark:shadow-md flex justify-between items-center text-sm h-84 group hover:border-blue-400 hover:cursor-pointer transition-colors duration-300">
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4" />
                        <h2 className="text-base">Win Cash Prizes</h2>
                    </div>
                    <p className="text-secondary-foreground w-60">
                        Outsmart the competition, and <span className="text-foreground">earn real rewards</span> by joining our exclusive paid programming contests.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Easy to build</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Code your victory</span>
                    </div>
                </div>
            </div>
            <div className="mr-12">
                <CentVisual />
            </div>
        </div>
    );
}
