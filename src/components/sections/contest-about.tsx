import { Widget, WidgetContent, WidgetTitle, } from "@/components/ui/widget";
import { ContestDetailed } from "@/api/dto/response";
import { format_duration } from "@/lib/utils";
import { format_date } from '@/lib/utils';
import { use } from "react";

export default function ContestAbout({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    return (
        <Widget className="flex-1">
            <WidgetContent>
                <WidgetTitle className="text-bright-text">
                    ABOUT
                </WidgetTitle>
                <div className="flex">
                    <div className="flex-1 text-secondary-text">
                        Start
                    </div>
                    <div className="flex-1">
                        {format_date(new Date(cdetailed.starting_at))}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-text">
                        Deadline
                    </div>
                    <div className="flex-1">
                        No
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-text">
                        Duration
                    </div>
                    <div className="flex-1">
                        {format_duration(cdetailed.duration_mins)}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-text">
                        Participants
                    </div>
                    <div className="flex-1">
                        {cdetailed.participants}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-text">
                        Slots
                    </div>
                    <div className="flex-1">
                        Not limited
                    </div>
                </div>
            </WidgetContent>
        </Widget>
    );
}
