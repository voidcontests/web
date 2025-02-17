import { getLeaderboard } from "@/actions/actions";
import ContentContainer from "@/components/content-container";
import Leaderboard from "@/components/sections/leaderboard";

export default async function Page({ params }: { params: { cid: string } }) {
    const leaderboard = getLeaderboard(params.cid);

    return (
        <ContentContainer>
            <Leaderboard leaderboard={leaderboard}  />
        </ContentContainer>
    );
}
