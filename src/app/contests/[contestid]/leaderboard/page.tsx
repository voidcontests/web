'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from "@/ui/table";
import ContentContainer from "@/containers/content";
import Leaderboard from "@/modules/contest/leaderboard";
import { getLeaderboard } from "@/lib/api";
import { useEffect, useState } from "react";
import { Pagination, LeaderboardItem } from "@/lib/api";
import { toast } from "@/components/toast";
import TableLoading from "@/components/loading/table";

export default function Page({ params }: { params: { contestid: string } }) {
    const [leaderboard, setLeaderboard] = useState<Pagination<LeaderboardItem> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const result = await getLeaderboard(params.contestid);
            if (result.ok) {
                setLeaderboard(result.data);
            } else {
                toast({ title: 'Loading leaderboard failed', description: result.error.message });
            }
            setLoading(false);
        }
        load();
    }, [params.contestid]);

    if (loading) {
        return (
            <ContentContainer>
                <TableLoading title='LEADERBOARD' />
            </ContentContainer>
        );
    }

    if (!leaderboard) {
        return (
            <ContentContainer>
                <TableContainer>
                    <TableTitle>
                        LEADERBOARD
                    </TableTitle>
                    <Table>
                        <TableCaption>
                            Loading leaderboard failed...
                        </TableCaption>
                    </Table>
                </TableContainer>
            </ContentContainer>
        );
    }

    return (
        <ContentContainer>
            <Leaderboard leaderboard={leaderboard.items} />
        </ContentContainer>
    );
}
