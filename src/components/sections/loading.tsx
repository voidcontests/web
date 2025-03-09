import { Table, TableCaption, TableContainer, TableTitle } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Widget, WidgetContent, WidgetTitle } from '../ui/widget';

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

export function WidgetTemplate({ title }: { title: string }) {
    return (
        <Widget className="flex-1">
            <WidgetContent>
                <WidgetTitle className="text-foreground">
                    {title}
                </WidgetTitle>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        <Skeleton className='h-4 w-2/5' />
                    </div>
                    <div className="flex-1">
                        <Skeleton className='h-4 w-4/5' />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        <Skeleton className='h-4 w-3/5' />
                    </div>
                    <div className="flex-1">
                        <Skeleton className='h-4 w-4/6' />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        <Skeleton className='h-4 w-2/3' />
                    </div>
                    <div className="flex-1">
                        <Skeleton className='h-4 w-2/8' />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        <Skeleton className='h-4 w-3/5' />
                    </div>
                    <div className="flex-1">
                        <Skeleton className='h-4 w-5/7' />
                    </div>
                </div>
            </WidgetContent>
        </Widget>
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

export function ContestInfoTemplate() {
    return (
        <div className="border rounded-xl bg-surface p-5 flex flex-col gap-5 not-dark:shadow-md">
            <Skeleton className="h-6 w-72 rounded-lg" />
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/11" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-2/5" />
            </div>
        </div>
    );
}
