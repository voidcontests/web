import Problemset from "@/modules/contest/problemset";
import ContentContainer from "@/containers/content";
import Overview from "@/modules/contest/overview";
import Details from "@/modules/contest/details";
import Setters from "@/modules/contest/setters";
import AppliedStatus from "@/modules/contest/applied-status";
import StartingIn from "@/modules/contest/starting-in";
import ErrorMessage from "@/modules/errors/message";
import ContestNotFound from "@/modules/errors/contest-not-found";
import { fetchContestByID } from "@/actions/contests";
import { fetchAccount } from "@/actions/account";
import { Metadata } from "next";
import { DeadlineWarning } from "@/modules/contest/deadline-warning";

type Props = {
    params: Promise<{ contestid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { contestid } = await params;
    const result = await fetchContestByID(contestid);

    if (!result.ok) {
        return {
            title: 'Contest Not Found \\ Void',
        };
    }

    return {
        title: `${result.data.title} \\ Void`,
    };
}

export default async function Page({ params }: Props) {
    const { contestid } = await params;

    const [contestResult, accountResult] = await Promise.all([
        fetchContestByID(contestid),
        fetchAccount(),
    ]);

    if (contestResult.status === 404) {
        return <ContestNotFound />;
    }

    if (!contestResult.ok) {
        return <ErrorMessage message={contestResult.error.message} />;
    }

    const contest = contestResult.data;
    const account = accountResult.ok ? accountResult.data : null;

    return (
        <ContentContainer>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9 flex flex-col gap-5">
                    <DeadlineWarning deadline={contest.entry?.submission_deadline} />
                    <Overview contest={contest} />
                    <Problemset contest={contest} />
                    <StartingIn contest={contest} />
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-5">
                        <Details contest={contest} />
                        <Setters contest={contest} />
                        <AppliedStatus contest={contest} account={account} />
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
