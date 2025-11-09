import Scores from "@/modules/contest/scores";
import ErrorMessage from "@/modules/errors/message";
import ContentContainer from "@/containers/content";
import ScoresNotFound from "@/modules/errors/scores-not-found";
import { fetchScores } from "@/actions/contests";
import { Metadata } from "next";

type Props = {
    params: Promise<{ contestid: string }>;
};

export const metadata: Metadata = {
    title: 'Scores \\ Void',
};

export default async function Page({ params }: Props) {
    const { contestid } = await params;

    const result = await fetchScores(contestid);

    if (result.status === 404) {
        return <ScoresNotFound />;
    }

    if (!result.ok) {
        return (
            <ContentContainer>
                <ErrorMessage message={result.error.message} />
            </ContentContainer>
        );
    }

    return (
        <ContentContainer>
            <Scores leaderboard={result.data.items} />
        </ContentContainer>
    );
}
