'use client';

import TableTemplate from "@/components/templates/table";
import Leaderboard from "@/modules/contest/leaderboard";
import { LeaderboardItem } from "@/lib/api";
import ErrorMessage from "@/modules/errors/message";
import ContentContainer from "@/containers/content";
import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/api";
import { ResultError } from "@/lib/client";
import RanksNotFound from "@/modules/errors/ranks-not-found";

export default function Page({ params }: { params: { contestid: string } }) {
    const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
    const [error, setError] = useState<ResultError | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const result = await getLeaderboard(params.contestid);
            if (result.ok) {
                setLeaderboard(result.data.items);
            } else {
                setError(result);
            }
            setLoading(false);
        }
        load();
    }, [params.contestid]);

    if (loading) {
        return (
            <ContentContainer>
                <TableTemplate title='LEADERBOARD' caption='Loading...' />
            </ContentContainer>
        );
    }

    if (error && error.status === 404) {
        return <RanksNotFound />
    }

    if (error !== null) {
        return <ErrorMessage message={error.error.message} />
    }

    return (
        <ContentContainer>
            <Leaderboard leaderboard={leaderboard} />
        </ContentContainer>
    );
}
