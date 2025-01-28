'use client';

import { ContestDetailed } from "@/api/dto/response";
import { use } from "react";
import Timer from "../timer";

export default function ContestStartingCountdown({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    return (
        <Timer target={new Date(cdetailed.starting_at)} />
    );
}