'use client';

import ContentContainer from "@/components/content-container";
import Leaderboard from "@/components/sections/leaderboard";
import { getLeaderboard } from "@/lib/api";
import { useEffect, useState } from "react";
import { Result, Pagination, LeaderboardItem } from "@/lib/api";

export default function Page({ params }: { params: { cid: string } }) {
    const [leaderboard, setLeaderboard] = useState<Promise<Result<Pagination<LeaderboardItem>>> | null>(null);

    useEffect(() => {
        setLeaderboard(getLeaderboard(params.cid));
    }, [params.cid]);

    if (!leaderboard) {
        return <ContentContainer>Loading...</ContentContainer>;
    }

    return (
        <ContentContainer>
            <Leaderboard leaderboard={leaderboard} />
        </ContentContainer>
    );
}
