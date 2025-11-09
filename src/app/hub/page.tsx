import ContentContainer from "@/containers/content";
import { Separator } from "@/ui/separator";
import CreatedContests from "@/modules/hub/created-contests";
import { Suspense } from "react";
import TableTemplate from "@/components/templates/table";
import { Link } from "@/ui/link";

type Props = {
    searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
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
                    You can view your problems <Link href="/hub/problems">here</Link>.
                </p>
            </div>
            <Separator />
            <Suspense fallback={<TableTemplate title='CONTESTS' caption='Loading...' />}>
                <CreatedContests page={page} />
            </Suspense>
        </ContentContainer>
  );
}
