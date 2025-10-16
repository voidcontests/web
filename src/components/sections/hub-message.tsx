'use client';

import { MessageBox } from '@/components/sections/message-box';
import { Account } from '@/lib/models';
import { use } from 'react';
import { Result } from "@/lib/api";

export default function HubMessage({ account }: { account: Promise<Result<Account>> }) {
    const result = use(account);
    if (!result.ok) {
        throw new Error('unauthorized');
    }

    const acc = result.data;

    if (acc.role.name === 'admin') {
        return (
            <MessageBox>
                <span className='font-medium'>
                    YOU HAVE GOD DAMN ADMIN RIGHTS
                </span>
                <span>
                    For now, admin rights are just you have no limitations on
                    creating contests. But maybe in future, it going to have more sense
                </span>
            </MessageBox>
        );
    }

    if (acc.role.name === 'banned') {
        return (
            <MessageBox variant='error'>
                <span className='font-medium'>
                    BANNED
                </span>
                <span>
                    You have been banned from creating contests and problems for acting against the admins' will.
                </span>
            </MessageBox>
        );
    }

    if (acc.role.name === 'limited') {
        return (
            <MessageBox variant='warning'>
                <span className='font-medium'>
                    LIMITED MODE
                </span>
                <span>
                    {`You are in kinda limited mode. You can create up to ${acc.role.created_contests_limit} contests and ${acc.role.created_problems_limit} problems.
                    I didn't figured out how to upgrade limitations yet, so for now just enjoy
                    this situation or contact me somewhere`}
                </span>
            </MessageBox>
        );
    }
}
