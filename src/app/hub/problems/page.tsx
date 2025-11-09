import ContentContainer from "@/containers/content";
import { redirect } from "next/navigation";
import CreatedProblems from "@/modules/hub/created-problems";
import { fetchAccount } from "@/actions/account";
import { Suspense } from "react";
import TableTemplate from "@/components/templates/table";
import { Link } from "@/ui/link";
import { Separator } from "@/ui/separator";

type Props = {
    searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
    const result = await fetchAccount();

    if (!result.ok) {
        redirect('/login?next=/hub');
    }

    const params = await searchParams;
    const page = parseInt(params.page || '1', 10);

    return (
        <ContentContainer>
            <div className='flex flex-col gap-1'>
                <h1 className='text-xl font-medium'>
                    Welcome to creator's hub
                </h1>
                <p className='text-base text-foreground/80'>
                    Here you can control all of your created competitions, create new problems and contests.
                    You can view your contests <Link href="/hub">here</Link>.
                </p>
            </div>
            <Separator />
            <Suspense fallback={<TableTemplate title='PROBLEMS' caption='Loading...' />}>
                <CreatedProblems page={page} />
            </Suspense>
        </ContentContainer>
    );
}
