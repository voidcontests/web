'use client';

import Problemset from "@/modules/contest/problemset";
import ContentContainer from "@/containers/content";
import Overview from "@/modules/contest/overview";
import Details from "@/modules/contest/details";
import Setters from "@/modules/contest/setters";
import AppliedStatus from "@/modules/contest/applied-status";
import { useAccount } from "@/hooks/use-account";
import { getContestByID } from "@/lib/api";
import { useEffect, useState } from "react";
import { ContestDetailed } from "@/lib/api";
import ContestLoading from "@/components/loading/contest";
import StartingIn from "@/modules/contest/starting-in";
import { capitalize } from "@/lib/strings";

export default function Page({ params }: { params: { contestid: string } }) {
    const [contest, setContest] = useState<ContestDetailed | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { account } = useAccount(); // TODO: handler error and loading

    useEffect(() => {
        (async () => {
            const rcontest = await getContestByID(params.contestid);
            if (!rcontest.ok) {
                setError(rcontest.error.message);
            } else {
                setContest(rcontest.data);
            }
            setLoading(false);
        })();
    }, [params.contestid]);

    if (loading) {
        return <ContestLoading />
    }

    if (!contest || error !== null) {
        throw new Error(capitalize(error ?? 'Contest not found'));
    }

    return (
        <ContentContainer>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9 flex flex-col gap-5">
                    <Overview contest={contest} />
                    <Problemset contest={contest} account={account} />
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
