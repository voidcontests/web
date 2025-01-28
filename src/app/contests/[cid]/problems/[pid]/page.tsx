import ContentContainer from "@/components/content-container";
import ProblemView from "@/components/sections/problem-view";
import { getContest, getProblem } from "@/actions/actions";
import Problemset from "@/components/sections/problemset";
import Setters from "@/components/sections/setters";

export default async function Page({ params }: { params: { cid: string, pid: string } }) {
    const problem = getProblem(params.cid, params.pid);
    const contest = getContest(params.cid);

    return (
        <ContentContainer>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9">
                    <ProblemView problem={problem} /> {/* TODO: Add suspense */}
                </div>
                <div className="col-span-3 flex flex-col gap-5">
                    <Problemset contest={contest} />
                    <Setters problem={problem} />
                </div>
            </div>
        </ContentContainer>
    );
}