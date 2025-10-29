'use client'

import { ArrowRight } from 'lucide-react';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { capitalize } from '@/lib/strings';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-[35vh]">
            <h1 className="text-3xl text-foreground font-semibold leading-none">
                SOMETINHG BROKEN
            </h1>
            <div className="text-xl text-tertiary-foreground">
                { capitalize(error.message) }
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
