'use client'

import { MessageBox } from '@/components/sections/message-box';
import ContentContainer from '@/components/content-container';

export default function Error({ error }: { error: Error & { digest?: string } }) {
    return (
        <ContentContainer>
            <MessageBox variant='error'>
                <span>
                    You need to connect wallet to have access to creator's hub.
                </span>
            </MessageBox>
        </ContentContainer>
    )
}
