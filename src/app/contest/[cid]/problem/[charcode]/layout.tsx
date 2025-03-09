import { getContestProblem } from "@/actions/actions";

export async function generateMetadata({ params }: { params: { cid: string, charcode: string } }) {
    const problem = await getContestProblem(params.cid, params.charcode);

    return {
        title: `Problem ${params.charcode.toUpperCase()} - ${problem.title}`,
    }
}

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
