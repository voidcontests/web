import { Table, TableCaption, TableContainer, TableTitle } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function TableTemplate({ title }: { title: string }) {
    return (
        <TableContainer>
            <TableTitle>
                {title}
            </TableTitle>
            <Table>
                <TableCaption>
                    Loading...
                </TableCaption>
            </Table>
        </TableContainer>
    );
}

export function ProblemTemplate() {
    return (
        <div className='flex flex-col gap-7'>
            <div className='flex justify-center items-center'>
                <Skeleton className='h-6 w-96'/>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-3'>
                    <Skeleton className='h-4 w-[100%]'/>
                    <Skeleton className='h-4 w-[97%]'/>
                    <Skeleton className='h-4 w-[90%]'/>
                </div>
                <div className='flex flex-col gap-3'>
                    <Skeleton className='h-4 w-[100%]'/>
                    <Skeleton className='h-4 w-[72%]'/>
                </div>
            </div>
        </div>
    );
}
