'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from "@/ui/table";
import ContentContainer from "@/containers/content";
import Leaderboard from "@/modules/contest/leaderboard";
import { getLeaderboard } from "@/lib/api";
import { useEffect, useState } from "react";
import { Pagination, LeaderboardItem } from "@/lib/api";
import { toast } from "@/components/toast";
import TableTemplate from "@/components/templates/table";

export default function Page({ params }: { params: { contestid: string } }) {
    const [leaderboard, setLeaderboard] = useState<Pagination<LeaderboardItem> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const result = await getLeaderboard(params.contestid);
            if (result.ok) {
                setLeaderboard(result.data);
            } else {
                toast({ title: 'Fetching leaderboard failed', description: result.error.message });
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

    if (!leaderboard) {
        return (
            <ContentContainer>
                <TableTemplate title='LEADERBOARD' caption='Fetching leaderboard failed' />
            </ContentContainer>
        );
    }

    return (
        <ContentContainer>
            <Leaderboard leaderboard={leaderboard.items} />
        </ContentContainer>
    );
}
