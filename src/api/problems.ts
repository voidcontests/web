import instance from "./core/instance";

interface Problems {
    data: Problem[];
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

        return data;
    } catch (e) {
        console.error(e);
        return;
    }
}