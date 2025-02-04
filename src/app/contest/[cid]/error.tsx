'use client'

import ContentContainer from '@/components/content-container'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <ContentContainer>
            <div className="py-4 px-6 rounded-lg bg-scarlet-500/20 border border-scarlet-500 text-scarlet-500">
                Contest was not found
            </div>
        </ContentContainer>
    )
}
