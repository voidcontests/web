import { getContestByID } from "@/actions/contests";

export async function generateMetadata({ params }: { params: { cid: string } }) {
    const result = await getContestByID(params.cid);

    if (!result.ok) {
        return {
            title: 'Contest :: THE VOID*'
        };
    }

    const contest = result.data;
    return {
        title: contest.title,
    }
}

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
