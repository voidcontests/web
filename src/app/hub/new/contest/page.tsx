'use client';

import ContentContainer from "@/containers/content";
import { CreateContestForm } from "@/forms/create-contest";
import { Separator } from "@/ui/separator";
import { Link } from "@/ui/link";

export default function Page() {
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
            <CreateContestForm />
        </ContentContainer>
    );
}
