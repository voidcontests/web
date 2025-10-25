'use client';

import { MessageBox } from '@/components/message-box';
import ContentContainer from '@/containers/content';

export default function Error({ error }: { error: Error }) {
    return (
        <ContentContainer>
            <MessageBox variant='error'>
                { error.message }
            </MessageBox>
        </ContentContainer>
    )
}
