import { getContest } from "@/actions/actions";
import ContentContainer from "@/components/content-container";
import AppliedStatus from "@/components/sections/applied-status";
import ContestAbout from "@/components/sections/contest-about";
import ContestAboutTable from "@/components/sections/contest-about-table";
import ContestInfo from "@/components/sections/contest-info";
import Setters from "@/components/sections/contest-setters";
import ContestStartingCountdown from "@/components/sections/contest-starting-countdown";
import Problemset from "@/components/sections/problemset";

export default async function Page({ params }: { params: { cid: string } }) {
    const contest = getContest(params.cid);

    return (
        <ContentContainer suppressHydrationWarning>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9 flex flex-col gap-5">
                    <ContestInfo contest={contest} />
                    {/* <ContestAboutTable contest={contest} /> */}
                    <Problemset contest={contest} difficulties />
                    <div className="flex flex-col items-center mt-12">
                        <ContestStartingCountdown contest={contest} />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-5">
                        <ContestAbout contest={contest} />
                        <Setters contest={contest} />
                        <AppliedStatus contest={contest} />
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
