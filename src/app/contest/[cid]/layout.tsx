import { getContestByID } from "@/actions/contests";

export async function generateMetadata({ params }: { params: { cid: string } }) {
    const { data: contest } = await getContestByID(params.cid);

    return {
        title: contest.title || 'Contest :: THE VOID*',
    }
}

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
