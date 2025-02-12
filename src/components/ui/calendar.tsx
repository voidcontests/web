"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import * as React from "react";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({className, classNames, showOutsideDays = true, ...props}: CalendarProps) {
    // TODO: fix weird behavior on click (today & selected)

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "size-7 min-w-0  bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "text-secondary-foreground rounded-md w-8 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: cn(
                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-zinc-100 [&:has([aria-selected].day-outside)]:bg-zinc-100/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-zinc-800 dark:[&:has([aria-selected].day-outside)]:bg-zinc-800/50",
                    props.mode === "range"
                        ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                        : "[&:has([aria-selected])]:rounded-md"
                ),
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "size-8 min-w-0 font-normal aria-selected:opacity-100"
                ),
                day_range_start: "day-range-start",
                day_range_end: "day-range-end",
                day_selected:
                    "bg-zinc-900 text-zinc-50 hover:bg-zinc-900 focus:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50 dark:focus:bg-zinc-50",
                day_today: "bg-zinc-100 dark:bg-zinc-800",
                day_outside:
                    "day-outside text-tertiary-foreground",
                day_disabled: "text-tertiary-foreground opacity-50",
                day_range_middle:
                    "aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ className, ...props }) => (
                    <ChevronLeft className={cn("size-4", className)} {...props} />
                ),
                IconRight: ({ className, ...props }) => (
                    <ChevronRight className={cn("size-4", className)} {...props} />
                ),
            }}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar";

export { Calendar }
