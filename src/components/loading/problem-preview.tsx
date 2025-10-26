import TableTemplate from "@/components/templates/table";
import ContentContainer from "@/containers/content";
import { Container } from "@/containers/default";
import { Separator } from "@/ui/separator";
import { Skeleton } from "@/ui/skeleton";

export default function ProblemPreviewLoading() {
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
                    <TableTemplate title='SETTERS' caption='Loading...' />
                </div>
            </div>
        </ContentContainer>
    );
}
