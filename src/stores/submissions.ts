import { create } from 'zustand';
import { getProblemSubmissions, ID } from '@/lib/api';
import { Submission } from '@/lib/models';
import { toast } from '@/components/toast';

interface SubmissionHistoryState {
    contestID: ID | null;
    charcode: string | null;
    submissions: Submission[];
    offset: number;
    total: number;
    limit: number;

    // actions
    setContext: (contestID: ID, charcode: string) => void;
    setOffset: (offset: number) => void;
    refetchHistory: () => Promise<void>;
    onSubmissionCreated: () => void;
    onSubmissionJudged: () => void;
}

export const useSubmissionsStore = create<SubmissionHistoryState>((set, get) => ({
    contestID: null,
    charcode: null,
    submissions: [],
    offset: 0,
    total: 0,
    limit: 10,

    setContext: (contestID, charcode) => {
        set({ contestID, charcode, offset: 0 });
    },

    setOffset: (offset) => {
        set({ offset });
    },

    refetchHistory: async () => {
        const { contestID, charcode, offset, limit } = get();

        if (!contestID || !charcode) return;

        const result = await getProblemSubmissions(contestID, charcode, offset, limit);
        if (result.ok) {
            set({
                submissions: result.data.items,
                total: result.data.meta.total,
            });
        } else {
            toast({ title: 'Failed to fetch submissions', description: result.error.message });
        }
    },

    onSubmissionCreated: () => {
        set({ offset: 0 });
        get().refetchHistory();
    },

    onSubmissionJudged: () => {
        get().refetchHistory();
    },
}));
