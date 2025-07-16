import { ContestProblemView } from '@/components/sections/contest-problem-view';
import { ProblemsetMinimal } from '@/components/sections/problemset';
import { getContestByID, getContestProblem } from '@/actions/contests';
import { getProblemSubmissions } from '@/actions/problems';
import ContentContainer from '@/components/content-container';
import Setters from '@/components/sections/problem-setters';
import { LatestSubmissionsView } from '@/components/sections/latest-submissions';

export default async function Page({ params }: { params: { cid: string, charcode: string } }) {
    const problem = getContestProblem(params.cid, params.charcode);
    const contest = getContestByID(params.cid);
    const submissions = getProblemSubmissions(params.cid, params.charcode, 10);

    return (
        <ContentContainer>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9 flex flex-col gap-5'>
                    <ContestProblemView problem={problem} />
                    <LatestSubmissionsView submissions={submissions} />
                </div>
                <div className='col-span-3 flex flex-col gap-5'>
                    <ProblemsetMinimal contest={contest} />
                    <Setters problem={problem} />
                </div>
            </div>
        </ContentContainer>
    );
}
