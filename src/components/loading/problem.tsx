import { Widget, WidgetContent, WidgetTitle } from '@/ui/widget';
import TableTemplate from "@/components/templates/table";
import ContentContainer from "@/containers/content";
import { Container } from "@/containers/default";
import { Separator } from "@/ui/separator";
import { Skeleton } from "@/ui/skeleton";

export default function ProblemLoading() {
    return (
        <ContentContainer>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9 flex flex-col gap-5'>
                    <Container className="py-5 px-7">
                        <div className="h-7 flex justify-center items-center gap-3 text-center">
                            <Skeleton className="h-6 w-72 rounded-lg" />
                        </div>
                        <Separator className="my-5"/>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/5" />
                        </div>
                    </Container>
                    <TableTemplate title='LATEST SUBMISSIONS' caption='Loading...' />
                </div>
                <div className='col-span-3 flex flex-col gap-5'>
                    <Widget className="flex-1">
                        <WidgetContent>
                            <WidgetTitle className="text-foreground">
                                DETAILS
                            </WidgetTitle>
                            <div className="flex">
                                <div className="flex-1 text-secondary-foreground">
                                    Time limit
                                </div>
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-[30px]" />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 text-secondary-foreground">
                                    Memory limit
                                </div>
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-[80px]" />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 text-secondary-foreground">
                                    Deadline
                                </div>
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-[50px]" />
                                </div>
                            </div>
                        </WidgetContent>
                    </Widget>
                    <TableTemplate title='PROBLEMSET' caption='Loading...' />
                    <TableTemplate title='SETTERS' caption='Loading...' />
                </div>
            </div>
        </ContentContainer>
    );
}
