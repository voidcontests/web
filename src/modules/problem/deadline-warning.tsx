'use client';

import { MessageBox } from '@/components/message-box';
import If from '@/components/if';
import { format } from 'date-fns';

// TODO: maybe we need to load onMounted, to prevent showing server time

export function DeadlineWarning({ deadline }: { deadline?: Date }) {
    if (!deadline) return null;

    return (
        <If condition={new Date() >= deadline}>
            <MessageBox variant='warning'>
                <span className='font-medium'>
                    DEADLINE IS GONE
                </span>
                <span>
                    {`You can no longer submit - the deadline for this problem was ${format(new Date(deadline), "d MMM, HH:mm")}.`}
                </span>
            </MessageBox>
        </If>
    );
}
