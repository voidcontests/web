import ContentContainer from "@/components/content-container";
import ProblemView from "@/components/sections/problem-view";
import { getContest, getProblem } from "@/actions/actions";
import Problemset from "@/components/sections/problemset";
import Setters from "@/components/sections/problem-setters";

export default async function Page({ params }: { params: { cid: string, charcode: string } }) {
    const problem = getProblem(params.cid, params.charcode);
    const contest = getContest(params.cid);

    return (
        <ContentContainer>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9">
                    <ProblemView problem={problem} /> {/* TODO: maybe add suspense */}
                </div>
                <div className="col-span-3 flex flex-col gap-5">
                    <Problemset contest={contest} currentProblem={params.charcode} />
                    <Setters problem={problem} />
                </div>
            </div>
        </ContentContainer>
    );
}
