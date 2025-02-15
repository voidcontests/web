'use client';

import { CreateProblemForm } from '@/components/forms/create-problem';
import ContentContainer from "@/components/content-container";
import { Separator } from '@/components/ui/separator';
import { Link } from '@/components/ui/link';

export default function Page() {
    return (
        <ContentContainer className="max-w-3xl">
            <div className='flex flex-col gap-1'>
                <h1 className='text-xl font-medium'>
                    Create a new problem
                </h1>
                <p className='text-sm text-foreground/80'>
                    Use this form to create a new problem. You can view all your created problems on the <Link href="/admin/problems">dashboard</Link> page.
                </p>
            </div>
            <Separator />
            <CreateProblemForm />
        </ContentContainer>
    );
}
