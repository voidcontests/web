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
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-3'>
                    <div className='pl-4'>
                        <Skeleton className='h-4 w-full'/>
                    </div>
                    <Skeleton className='h-4 w-full'/>
                    <Skeleton className='h-4 w-9/10'/>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='pl-4'>
                        <Skeleton className='h-4 w-full'/>
                    </div>
                    <Skeleton className='h-4 w-9/12'/>
                </div>
                <div className='flex flex-col gap-3'>
                    <Skeleton className='h-4 w-[18%]'/>
                    <Skeleton className='ml-[3%] h-4 w-[43%]'/>
                    <Skeleton className='ml-[3%] h-4 w-[27%]'/>
                    <Skeleton className='ml-[3%] h-4 w-[33%]'/>
                </div>
            </div>
        </div>
    );
}
