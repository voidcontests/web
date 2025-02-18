'use client'

import ContentContainer from '@/components/content-container'
import { MessageBox } from '@/components/message-box'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <ContentContainer>
            <MessageBox variant='error'>
                <span className='font-medium'>
                    UNAUTHORIZED
                </span>
                <span>
                    You need to connect wallet to have access to creator's hub.
                </span>
            </MessageBox>
        </ContentContainer>
    )
}
