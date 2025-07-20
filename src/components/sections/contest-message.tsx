'use client';

import { MessageBox } from '@/components/sections/message-box';
import { Account, ContestDetailed } from '@/actions/models/response';
import { use } from 'react';
import { Result } from "@/actions";

export default function ContestMessage({ contest }: { contest: Promise<Result<ContestDetailed>> }) {
    const result = use(contest);
    if (!result.ok) {
        return null;
    }

    const cdetailed = result.data;

    if (cdetailed.end_time < new Date()) {
        return (
            <MessageBox>
                <span className='font-medium'>
                    COMPETITION IS OVER
                </span>
                <span>
                    This contest is already finished. Only you as a creator allowed to see it.
                    Nobody else can't see it now, nor submit solutions for problems.
                </span>
            </MessageBox>
        );
    }

    return null;
}
