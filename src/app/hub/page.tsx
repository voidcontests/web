'use client';

import ContentContainer from "@/containers/content";
import { useAccount } from "@/hooks/use-account";
import HubMessage from "@/modules/hub/message";
import { Separator } from "@/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/loading/plug";
import CreatedContests from "@/modules/hub/created-contests";
import CreatedProblems from "@/modules/hub/created-problems";

export default function Page() {
    const { account, authorized, loading } = useAccount();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !authorized) {
            router.push('/login');
        }
    }, [loading]);

    // just for better convinience, return loading screen here as well
    // but it is not really necessary, because it redirects to /login pretty fast
    if (!account) {
        return <Loading />
    }

    return (
        <ContentContainer>
            <HubMessage account={account} />
            <div className='flex flex-col gap-1'>
                <h1 className='text-xl font-medium'>
                    Welcome to creator's hub
                </h1>
                <p className='text-base text-foreground/80'>
                    Here you can control all of your created competitions, create new problems and contests.
                </p>
            </div>
            <Separator />
            <CreatedContests />
            <CreatedProblems />
        </ContentContainer>
  );
}
