'use client';

import TableTemplate from "@/components/templates/table";
import Scores from "@/modules/contest/scores";
import { LeaderboardItem } from "@/lib/api";
import ErrorMessage from "@/modules/errors/message";
import ContentContainer from "@/containers/content";
import { useEffect, useState } from "react";
import { getScores } from "@/lib/api";
import { ResultError } from "@/lib/client";
import ScoresNotFound from "@/modules/errors/scores-not-found";

export default function Page({ params }: { params: { contestid: string } }) {
    const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
    const [error, setError] = useState<ResultError | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const result = await getScores(params.contestid);
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

    if (error !== null && error.status !== 404) {
        return <ErrorMessage message={error.error.message} />
    }

    if (error) {
        return <ScoresNotFound />
    }

    return (
        <ContentContainer>
            <Scores leaderboard={leaderboard} />
        </ContentContainer>
    );
}
