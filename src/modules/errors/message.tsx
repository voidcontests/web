'use client';

import { MessageBox } from '@/components/message-box';
import ContentContainer from '@/containers/content';
import { capitalize } from '@/lib/strings';

export default function ErrorMessage({ title, message }: { title?: string, message: string }) {
    return (
        <ContentContainer>
            <MessageBox variant='error'>
                {
                    title && title.trim().length > 0 &&
                    <span className='font-medium'>
                        { title }
                    </span>
                }
                <span>
                    { capitalize(message) }
                </span>
            </MessageBox>
        </ContentContainer>
    )
}
