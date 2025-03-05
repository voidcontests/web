import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const format_absolute = (date: Date): string => {
    date = new Date(date);
    const day = date.getDate();

    const month = MONTHS[date.getMonth()];

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month}, ${hours}:${minutes}`;
}

const format_relative = (date: Date): string => {
    date = new Date(date);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (Math.abs(diffSec) < 60) {
        return rtf.format(diffSec, "second");
    }

    const diffMin = Math.round(diffSec / 60);
    if (Math.abs(diffMin) < 60) {
        return rtf.format(diffMin, "minute");
    }

    const diffHour = Math.round(diffMin / 60);
    if (Math.abs(diffHour) < 24) {
        return rtf.format(diffHour, "hour");
    }

    const diffDay = Math.round(diffHour / 24);
    return rtf.format(diffDay, "day");
}

export default function DateView({ date, relative = false }: { date: Date, relative?: boolean }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="hover:cursor-pointer">
                        {
                            relative
                                ? format_relative(date)
                                : format_absolute(date)
                        }
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <span>
                        {
                            relative
                                ? format_absolute(date)
                                : format_relative(date)
                        }
                    </span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
