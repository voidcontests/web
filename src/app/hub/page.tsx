import ContentContainer from '@/components/content-container';
import AdminContests from '@/components/sections/admin-contests';
import AdminProblems from '@/components/sections/admin-problems';
import HubMessage from '@/components/sections/hub-message';
import { Separator } from '@/components/ui/separator';

export default async function Page() {
    return (
        <ContentContainer>
            <HubMessage />
            <div className='flex flex-col gap-1'>
                <h1 className='text-xl font-medium'>
                    Welcome to creator's hub
                </h1>
                <p className='text-base text-foreground/80'>
                    Here you can control all of your created competitions, create new problems and contests.
                </p>
            </div>
            <Separator />
            <AdminContests />
            <AdminProblems />
        </ContentContainer>
    );
}
