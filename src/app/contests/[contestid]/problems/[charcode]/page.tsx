import { SubmitView } from '@/modules/problem/submit-view';
import ContentContainer from '@/containers/content';
import SubmissionHistory from '@/modules/problem/submission-history';
import Setters from '@/modules/problem/setters';
import Problemset from '@/modules/contest/problemset-minimal';
import Statement from '@/modules/problem/statement';
import Details from '@/modules/problem/details';
import ErrorMessage from '@/modules/errors/message';
import ContestNotFound from '@/modules/errors/contest-not-found';
import ContestProblemNotFound from '@/modules/errors/contest-problem-not-found';
import { fetchContestByID, fetchContestProblem } from '@/actions/contests';
import { DeadlineWarning } from '@/modules/problem/deadline-warning';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ contestid: string; charcode: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { contestid, charcode } = await params;
    const [contest, problem] = await Promise.all([
        fetchContestByID(contestid),
        fetchContestProblem(contestid, charcode),
    ]);

    if (!problem.ok) {
        return {
            title: 'Problem Not Found \\ Void',
        };
    }

    if (!contest.ok) {
        return {
            title: 'Contest Not Found \\ Void',
        };
    }

    return {
        title: `${problem.data.charcode?.toUpperCase()}. ${problem.data.title} - ${contest.data.title} \\ Void`,
    };
}

export default async function Page({ params }: Props) {
    const { contestid, charcode } = await params;

    const [problemResult, contestResult] = await Promise.all([
        fetchContestProblem(contestid, charcode),
        fetchContestByID(contestid),
    ]);

    if (contestResult.status === 404) {
        return <ContestNotFound />;
    }

    if (problemResult.status === 404) {
        return <ContestProblemNotFound />;
    }

    if (!problemResult.ok) {
        return <ErrorMessage message={problemResult.error.message} />;
    }

    if (!contestResult.ok) {
        return <ErrorMessage message={contestResult.error.message} />;
    }

    const problem = problemResult.data;
    const contest = contestResult.data;
    const deadline_reached = problem.submission_deadline !== undefined && (new Date()) > problem.submission_deadline;

    return (
        <ContentContainer>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9 flex flex-col gap-5'>
                    <DeadlineWarning deadline={problem.submission_deadline} />
                    <Statement problem={problem} />
                    {!deadline_reached && <SubmitView problem={problem} />}
                    <SubmissionHistory contestID={contestid} charcode={charcode} />
                </div>
                <div className='col-span-3 flex flex-col gap-5 sticky top-5 self-start'>
                    <Details problem={problem} />
                    <Problemset contest={contest} />
                    <Setters problem={problem} />
                </div>
            </div>
        </ContentContainer>
    );
}
