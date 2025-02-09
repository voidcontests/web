"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";
import { cn } from "@/lib/utils";

export function TimePicker({ hours, minutes, seconds, date, setDate }: { hours?: boolean, minutes?: boolean, seconds?: boolean,  date: Date | undefined, setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) {
    const minuteRef = React.useRef<HTMLInputElement>(null);
    const hourRef = React.useRef<HTMLInputElement>(null);
    const secondRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className="flex items-end gap-2">
            <div className="grid gap-1">
                <Label htmlFor="hours" className={cn("text-xs", !hours && "text-tertiary-foreground")}>
                    Hrs
                </Label>
                <TimePickerInput
                    picker="hours"
                    date={date}
                    setDate={setDate}
                    ref={hourRef}
                    onRightFocus={() => minuteRef.current?.focus()}
                    disabled={!hours}
                />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="minutes" className={cn("text-xs", !minutes && "text-tertiary-foreground")}>
                    Mins
                </Label>
                <TimePickerInput
                    picker="minutes"
                    date={date}
                    setDate={setDate}
                    ref={minuteRef}
                    onLeftFocus={() => hourRef.current?.focus()}
                    onRightFocus={() => secondRef.current?.focus()}
                    disabled={!minutes}
                />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="seconds" className={cn("text-xs", !seconds && "text-tertiary-foreground")}>
                    Secs
                </Label>
                <TimePickerInput
                    picker="seconds"
                    date={date}
                    setDate={setDate}
                    ref={secondRef}
                    onLeftFocus={() => minuteRef.current?.focus()}
                    disabled={!seconds}
                />
            </div>
        </div>
    );
}
