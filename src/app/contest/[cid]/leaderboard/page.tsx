import ContentContainer from "@/components/content-container";
import Leaderboard from "@/components/sections/leaderboard";
import { getLeaderboard } from "@/actions/actions";

export default async function Page({ params }: { params: { cid: string } }) {
    const leaderboard = getLeaderboard(params.cid);

    return (
        <ContentContainer>
            <Leaderboard leaderboard={leaderboard}  />
        </ContentContainer>
    );
}
