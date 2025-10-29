import { getContestByIDServer } from "@/lib/api/contests-server";
import ErrorMessage from "@/modules/errors/message";
import ContestNotFound from "@/modules/errors/contest-not-found";
import ContestPageClient from "./contest-page-client";
import { Metadata } from "next";

type Props = {
    params: Promise<{ contestid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { contestid } = await params;
    const result = await getContestByIDServer(contestid);

    if (!result.ok) {
        return {
            title: 'Contest \\ Void',
        };
    }

    return {
        title: `${result.data.title} \\ Void`,
    };
}

export default async function Page({ params }: Props) {
    const { contestid } = await params;
    const result = await getContestByIDServer(contestid);

    if (!result.ok && result.status !== 404) {
        return <ErrorMessage message={result.error.message} />;
    }

    if (!result.ok || !result.data) {
        return <ContestNotFound />;
    }

    return <ContestPageClient contest={result.data} />;
}
