import ContestStartingCountdown from "@/components/sections/contest-starting-countdown";
import AppliedStatus from "@/components/sections/applied-status";
import ContentContainer from "@/components/content-container";
import ContestInfo from "@/components/sections/contest-info";
import Setters from "@/components/sections/contest-setters";
import Problemset from "@/components/sections/problemset";
import { getContest } from "@/actions/actions";
import dynamic from "next/dynamic";

const ContestAbout = dynamic(async () => {
    const mod = await import('@/components/sections/contest-about');
    return mod.ContestAbout;
}, {
    ssr: false,
    loading: () => <div>LOADING</div>
});

export default async function Page({ params }: { params: { cid: string } }) {
    const contest = getContest(params.cid);

    return (
        <ContentContainer suppressHydrationWarning>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9 flex flex-col gap-5">
                    <ContestInfo contest={contest} />
                    <Problemset contest={contest} difficulties />
                    <ContestStartingCountdown contest={contest} />
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
