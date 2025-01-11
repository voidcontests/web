import instance from "./core/instance";

export interface Contests {
    amount: number;
    contests: Contest[];
}

interface Contest {
    id: number;
    title: string;
    description: string;
    creator_address: string;
    starting_at: Date;
    duration_mins: number;
    is_draft: boolean;
    created_at: Date;
}

export const getContests = async (): Promise<Contests | undefined> => {
    try {
        const { data } = await instance.get('/contests');

        return { amount: data.amount, contests: data.contests };
    } catch (e) {
        console.error(e);
        return;
    }
}