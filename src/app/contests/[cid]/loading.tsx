import ContentContainer from "@/components/content-container";
import { ContestInfoTemplate, TableTemplate, WidgetTemplate } from "@/components/sections/loading";

export default function Loading() {
    return (
        <ContentContainer suppressHydrationWarning>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9 flex flex-col gap-5">
                    <ContestInfoTemplate />
                    <TableTemplate title='PROBLEMSET' />
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-5">
                        <WidgetTemplate title='ABOUT' />
                        <TableTemplate title='SETTERS' />
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
