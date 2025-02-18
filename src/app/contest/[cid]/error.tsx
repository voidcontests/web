'use client'

import ContentContainer from '@/components/content-container'
import { MessageBox } from '@/components/message-box'

export default function Error({ error }: { error: Error }) {
    return (
        <ContentContainer>
            <MessageBox variant='error'>
                Contest was not found
            </MessageBox>
        </ContentContainer>
    )
}
