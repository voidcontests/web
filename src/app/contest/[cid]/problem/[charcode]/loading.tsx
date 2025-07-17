import { ProblemTemplate, TableTemplate } from '@/components/sections/loading';
import ContentContainer from '@/components/content-container';

export default async function Loading() {
    return (
        <ContentContainer>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9'>
                    <ProblemTemplate />
                </div>
                <div className='col-span-3 flex flex-col gap-5'>
                    <TableTemplate title='PROBLEMSET' />
                    <TableTemplate title='SETTERS' />
                </div>
            </div>
        </ContentContainer>
    );
}
