import { authorized, unauthorized } from "./core/instance";
import { ProblemDetailed, SubmissionListItem } from "./dto/response";

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
        const { data } = await unauthorized.get('/problems');

        return data;
    } catch (e) {
        console.error(e);
        return;
    }
}

export const getByID = async (cid: string | number, pid: string | number): Promise<ProblemDetailed | undefined> => {
    try {
        const { data } = await authorized.get(`/contests/${cid}/problems/${pid}`);

        return data;
    } catch (e) {
        console.error(e);
        return;
    }
}

export const submit = async (cid: string | number, pid: string | number, answer: string): Promise<SubmissionListItem | undefined> => {
    try {
        const { data } = await authorized.post(`/contests/${cid}/problems/${pid}/submissions`, { answer });

        return data;
    } catch (e) {
        console.error(e);
        return;
    }
}