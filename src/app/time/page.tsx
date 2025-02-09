'use client';

import { DateTimePicker } from "@/components/time-picker/date-time-picker";
import { useState } from "react";

export default function Page() {
    const [date, setDate] = useState<Date | undefined>();

    return (
        <div className="px-10">
            <DateTimePicker date={date} setDate={setDate} />
        </div>
    );
}
