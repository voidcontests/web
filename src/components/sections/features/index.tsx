import PublicCompetitionsCard from "./public-competitions-card";
import WinsCard from "./wins-card";
import HostCard from "./host-card";

export default function Features() {
    return (
        <div className='grid grid-cols-12 gap-5 w-full max-sm:flex max-sm:flex-col max-sm:gap-3'>
            <WinsCard />
            <PublicCompetitionsCard />
            <HostCard />
        </div>
    );
}
