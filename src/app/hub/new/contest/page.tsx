'use client';

import ContentContainer from "@/components/content-container";
import { CreateContestForm } from "@/components/forms/create-contest";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/components/ui/link";
import { getCreatedProblems } from "@/lib/api";
import { useEffect, useState } from "react";
import { Result, Pagination, ProblemListItem } from "@/lib/api";

export default function Page() {
    const [ps, setPs] = useState<Promise<Result<Pagination<ProblemListItem>>> | null>(null);

    useEffect(() => {
        setPs(getCreatedProblems(0, 10));
    }, []);

    if (!ps) {
        return <ContentContainer>Loading...</ContentContainer>;
    }

    return (
        <ContentContainer className="max-w-3xl">
            <div className='flex flex-col gap-1'>
                <h1 className='text-xl font-medium'>
                    Create new contest
                </h1>
                <p className='text-base text-foreground/80'>
                    Use this form to create a new competition. You can view all your created contests on the <Link href="/hub">creator's hub</Link>.
                </p>
            </div>
            <Separator />
            <CreateContestForm problems={ps} />
        </ContentContainer>
    );
}
