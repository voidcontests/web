import { getContestProblem } from "@/actions/contests";

export async function generateMetadata({ params }: { params: { cid: string, charcode: string } }) {
    const result = await getContestProblem(params.cid, params.charcode);

    if (!result.ok) {
        return {
            title: 'Problem',
        }
    }

    const problem = result.data;
    return {
        title: `Problem ${params.charcode.toUpperCase()} - ${problem.title}`,
    }
}

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
