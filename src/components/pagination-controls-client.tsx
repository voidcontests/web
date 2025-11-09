'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsClientProps {
    offset: number;
    limit: number;
    total: number;
}

export default function PaginationControlsClient({ offset, limit, total }: PaginationControlsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePrev = () => {
        const newOffset = Math.max(0, offset - limit);
        const newPage = Math.floor(newOffset / limit) + 1;
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`);
    };

    const handleNext = () => {
        if (offset + limit < total) {
            const newOffset = offset + limit;
            const newPage = Math.floor(newOffset / limit) + 1;
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', newPage.toString());
            router.push(`?${params.toString()}`);
        }
    };

    return (
        <div className="flex justify-between items-center w-full px-2">
            <div className="w-1/3" />

            <div className="w-1/3 text-center text-sm">
                Showing {offset + 1}–{Math.min(offset + limit, total)} of {total}
            </div>

            <div className="w-1/3 flex justify-end space-x-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="min-w-0"
                    onClick={handlePrev}
                    disabled={offset === 0}
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="min-w-0"
                    onClick={handleNext}
                    disabled={offset + limit >= total}
                >
                    <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
