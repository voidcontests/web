import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { TimePicker } from "./time-picker";
import { add, format } from "date-fns";
import { cn } from "@/lib/utils";
import * as React from "react";

export function DateTimePicker({ placeholder, date, setDate }: { placeholder?: string, date: Date | undefined, setDate: (v: Date) => void }) {
    /**
    * carry over the current time when a user clicks a new day
    * instead of resetting to 00:00
    */
    const handleSelect = (newDay: Date | undefined) => {
        if (!newDay) return;
        if (!date) {
            setDate(newDay);
            return;
        }

        const diff = newDay.getTime() - date.getTime();
        const diffInDays = diff / (1000 * 60 * 60 * 24);
        const newDateFull = add(date, { days: Math.ceil(diffInDays) });
        setDate(newDateFull);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    {
                        date
                            ? format(date, "PPP HH:mm:ss")
                            : placeholder
                                ? placeholder
                                : <span className="text-secondary-foreground">Pick a date</span>
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => handleSelect(d)}
                    disabled={(date) =>
                        date < new Date(new Date().setDate(new Date().getDate() - 1)) || date > new Date("2037-01-01")
                    }
                    initialFocus
                />
                <div className="p-3 border-t border-border">
                    <TimePicker setDate={setDate} date={date} hours />
                </div>
            </PopoverContent>
        </Popover>
    );
}
