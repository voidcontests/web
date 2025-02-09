"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";

export function TimePicker({ date, setDate }: { date: Date | undefined, setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) {
    const minuteRef = React.useRef<HTMLInputElement>(null);
    const hourRef = React.useRef<HTMLInputElement>(null);
    const secondRef = React.useRef<HTMLInputElement>(null);

    return (
        <div className="flex items-end gap-2">
            <div className="grid gap-1">
                <Label htmlFor="hours" className="text-xs">
                    Hrs
                </Label>
                <TimePickerInput
                    picker="hours"
                    date={date}
                    setDate={setDate}
                    ref={hourRef}
                    onRightFocus={() => minuteRef.current?.focus()}
                />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="minutes" className="text-xs">
                    Mins
                </Label>
                <TimePickerInput
                    picker="minutes"
                    date={date}
                    setDate={setDate}
                    ref={minuteRef}
                    onLeftFocus={() => hourRef.current?.focus()}
                    onRightFocus={() => secondRef.current?.focus()}
                />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="seconds" className="text-xs">
                    Secs
                </Label>
                <TimePickerInput
                    disabled
                    picker="seconds"
                    date={date}
                    setDate={setDate}
                    ref={secondRef}
                    onLeftFocus={() => minuteRef.current?.focus()}
                />
            </div>
        </div>
    );
}
