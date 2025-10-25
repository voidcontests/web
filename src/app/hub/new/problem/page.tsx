import CreateProblemForm from '@/forms/create-problem';
import ContentContainer from '@/containers/content';
import { Separator } from '@/ui/separator';
import { Link } from '@/ui/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'New problem',
};

export default async function Page() {
    return (
        <ContentContainer className="max-w-3xl">
            <div className='flex flex-col gap-1'>
                <h1 className='text-xl font-medium'>
                    Create new problem
                </h1>
                <p className='text-base text-foreground/80'>
                    Use this form to create a new problem. You can view all your created problems on the <Link href="/hub">creator's hub</Link>.
                </p>
            </div>
            <Separator />
            <CreateProblemForm />
        </ContentContainer>
    );
}
