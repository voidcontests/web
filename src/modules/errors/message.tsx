'use client';

import { MessageBox } from '@/components/message-box';
import ContentContainer from '@/containers/content';
import { capitalize } from '@/lib/strings';

export default function ErrorMessage({ title = 'SOMETHING WENT WRONG', message }: { title?: string, message: string }) {
    return (
        <ContentContainer>
            <MessageBox variant='error'>
                <span className='font-medium'> { title } </span>
                <span>
                    { capitalize(message) }
                </span>
            </MessageBox>
        </ContentContainer>
    )
}
