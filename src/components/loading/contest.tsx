import { Widget, WidgetContent, WidgetTitle } from '@/ui/widget';
import ContentContainer from "@/containers/content";
import { Skeleton } from "@/ui/skeleton";
import TableTemplate from "@/components/templates/table";

export default function ContestLoading() {
    return (
        <ContentContainer>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9 flex flex-col gap-5">
                    <div className="border rounded-xl bg-surface p-5 flex flex-col gap-5 not-dark:shadow-md">
                        <Skeleton className="h-6 w-72 rounded-lg" />
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-10/11" />
                        </div>
                    </div>
                    <TableTemplate title="PROBLEMSET" caption='Loading...' />
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-5">
                        <Widget className="flex-1">
                            <WidgetContent>
                                <WidgetTitle className="text-foreground">
                                    ABOUT
                                </WidgetTitle>
                                <div className="flex h-5">
                                    <div className="flex-1 text-secondary-foreground">
                                        Start
                                    </div>
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-[80px]" />
                                    </div>
                                </div>
                                <div className="flex h-5">
                                    <div className="flex-1 text-secondary-foreground">
                                        End
                                    </div>
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-[80px]" />
                                    </div>
                                </div>
                                <div className="flex h-5">
                                    <div className="flex-1 text-secondary-foreground">
                                        Deadline
                                    </div>
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-[35px]" />
                                    </div>
                                </div>
                                <div className="flex h-5">
                                    <div className="flex-1 text-secondary-foreground">
                                        Participants
                                    </div>
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-[35px]" />
                                    </div>
                                </div>
                                <div className="flex h-5">
                                    <div className="flex-1 text-secondary-foreground">
                                        Total seats
                                    </div>
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-[70px]" />
                                    </div>
                                </div>
                            </WidgetContent>
                        </Widget>
                        <TableTemplate title="SETTERS" caption='Loading...' />
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
