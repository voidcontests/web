import { Cannabis } from "lucide-react";
import AmpersandsVisual from "./ampersands-visual";
import KeyboardVisual from "./keyboard-visual";

export default function HostCard() {
    return (
        <div className="col-span-3 rounded-xl bg-surface border flex flex-col justify-between text-sm h-84 group hover:border-blue-400 hover:cursor-pointer transition-colors duration-300">
            <div className="m-5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Cannabis className="w-4 h-4" />
                    <h2 className="text-base">Host a Competition</h2>
                </div>
                <p className="text-secondary-foreground w-60">
                    You can create <span className="text-foreground">up to 5 own contests.</span> Bring your best ideas to life.
                </p>
            </div>
            <div className="w-full overflow-hidden flex justify-end pb-5">
                <KeyboardVisual />
            </div>
        </div>
    );
}
