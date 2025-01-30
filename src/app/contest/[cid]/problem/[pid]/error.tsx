'use client'

import ContentContainer from '@/components/content-container'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <ContentContainer>
            <div className="py-4 px-6 rounded-lg bg-critical-subdued border border-critical text-critical-text">
                Problem was not found
            </div>
        </ContentContainer>
    )
}