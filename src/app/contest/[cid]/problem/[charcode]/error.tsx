'use client';

import { MessageBox } from '@/components/sections/message-box';
import ContentContainer from '@/components/content-container';

export default function Error({ error }: { error: Error }) {
    return (
        <ContentContainer>
            <MessageBox variant='error'>
                Problem was not found
            </MessageBox>
        </ContentContainer>
    )
}
