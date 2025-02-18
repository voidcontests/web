'use client'

import ContentContainer from '@/components/content-container'
import { MessageBox } from '@/components/message-box'
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-[35vh]">
            <h1 className="text-4xl text-foreground font-semibold leading-none">
                {'ERROR: {500}'}
            </h1>
            <div className="text-xl text-tertiary-foreground">
                Something went wrong
            </div>
            <div className='flex flex-row gap-5'>
                <Button onClick={reset}>
                    TRY AGAIN
                </Button>
                <Link href="/">
                    <Button variant="outline">
                        GO HOME <ArrowRight />
                    </Button>
                </Link>
            </div>
        </div>
    )
}
