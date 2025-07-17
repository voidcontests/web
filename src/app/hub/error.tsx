'use client'

import { MessageBox } from '@/components/sections/message-box';
import ContentContainer from '@/components/content-container';

export default function Error() {
    return (
        <ContentContainer>
            <MessageBox variant='error'>
                <span>
                    You have to sign in to have access to creator's hub.
                </span>
            </MessageBox>
        </ContentContainer>
    )
}
