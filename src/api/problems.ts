import { authorized, unauthorized } from "./core/instance";
import { SubmissionListItem } from "../actions/dto/response";

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

export const submitAnswerForProblem = async (cid: string | number, charcode: string, answer: string): Promise<SubmissionListItem | undefined> => {
    try {
        const { data } = await authorized.post(`/contests/${cid}/problems/${charcode}/submissions`, { answer });

        return data;
    } catch (e) {
        console.error(e);
        return;
    }
}
