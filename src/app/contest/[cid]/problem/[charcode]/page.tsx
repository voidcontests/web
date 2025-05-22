import { ContestProblemView } from '@/components/sections/contest-problem-view';
import { ProblemsetMinimal } from '@/components/sections/problemset';
import { getContestByID, getContestProblem } from '@/actions';
import ContentContainer from '@/components/content-container';
import Setters from '@/components/sections/problem-setters';

export default async function Page({ params }: { params: { cid: string, charcode: string } }) {
    const problem = getContestProblem(params.cid, params.charcode);
    const contest = getContestByID(params.cid);

    return (
        <ContentContainer>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9'>
                    <ContestProblemView problem={problem} />
                </div>
                <div className='col-span-3 flex flex-col gap-5'>
                    <ProblemsetMinimal contest={contest} />
                    <Setters problem={problem} />
                </div>
            </div>
        </ContentContainer>
    );
}
