'use client';

import Problemset from "@/modules/contest/problemset";
import ContentContainer from "@/containers/content";
import Overview from "@/modules/contest/overview";
import Details from "@/modules/contest/details";
import Setters from "@/modules/contest/setters";
import AppliedStatus from "@/modules/contest/applied-status";
import { useAccount } from "@/hooks/use-account";
import { ContestDetailed } from "@/lib/api";
import StartingIn from "@/modules/contest/starting-in";

export default function ContestPageClient({ contest }: { contest: ContestDetailed }) {
    const { account } = useAccount();

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
