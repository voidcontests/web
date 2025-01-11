import instance from "./core/instance";

interface Problems {
    amount: number;
    problems: Problem[];
}

interface Problem {
    id: number;
    contest_id: number;
    title: string;
    statement: string;
    difficulty: string;
    writer_address: string;
    input: string;
    answer: string;
    created_at: Date;
}

export const getProblems = async (): Promise<Problems | undefined> => {
    try {
        const { data } = await instance.get('/problems');

        return { amount: data.amount, problems: data.problems };
    } catch (e) {
        console.error(e);
        return;
    }
}