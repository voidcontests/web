import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
    offset: number;
    limit: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
}

export default function PaginationControls({ offset, limit, total, onPrev, onNext }: PaginationControlsProps) {
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
                    onClick={onPrev}
                    disabled={offset === 0}
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="min-w-0"
                    onClick={onNext}
                    disabled={offset + limit >= total}
                >
                    <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
