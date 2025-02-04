import { Check, Coins } from "lucide-react";
import CentVisual from "./cent-visual";
import WinsCard from "./wins-card";
import PublicCompetitionsCard from "./public-competitions-card";
import HostCard from "./host-card";

export default function Features() {
    return (
        <div className="grid grid-cols-12 gap-5 w-full">
            <WinsCard />
            <PublicCompetitionsCard />
            <HostCard />
        </div>
    );
}
