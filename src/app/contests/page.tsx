import OfficialContests from "@/components/sections/official-contests";
import { Loading } from "@/components/sections/public-contests";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Metadata } from "next";
import { getContests } from "@/actions/actions";
import dynamic from "next/dynamic";
const PublicContests = dynamic(() => import('@/components/sections/public-contests'), { ssr: false, loading: () => <Loading /> });

export const metadata: Metadata = {
    title: 'Contests :: THE VOID*',
};

export default async function ContestsPage() {
    const contests = getContests();

    return (
        <div className="flex justify-center">
            <div className="max-w-7xl w-full flex gap-5">
                <div className="w-full flex flex-col gap-7 mx-4">
                    <OfficialContests />
                    <Separator />
                    <Suspense fallback={<Loading />}>
                        <PublicContests contests={contests} />
                    </Suspense>
                </div>
            </div>
        </div >
    );
}
