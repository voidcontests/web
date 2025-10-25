import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pulseVariants = cva(
    "relative flex items-center justify-center",
    {
        variants: {
            variant: {
                inactive: "",
                green: "",
                blue: "",
            },
        },
        defaultVariants: {
            variant: "inactive",
        },
    }
);

const dotVariants = cva(
    "relative inline-flex h-2 w-2 rounded-full",
    {
        variants: {
            variant: {
                inactive: "bg-zinc-950/15 dark:bg-zinc-50/15",
                green: "bg-green-500",
                blue: "bg-blue-400",
            },
        },
    }
);

const pingVariants = cva(
    "absolute inline-flex h-2 w-2 animate-ping rounded-full border opacity-75",
    {
        variants: {
            variant: {
                inactive: "",
                green: "border-green-500 bg-green-500",
                blue: "border-blue-400 bg-blue-400",
            },
        },
    }
);

export interface PulseProps extends VariantProps<typeof pulseVariants> {
    className?: string;
}

export default function Pulse({ variant = "inactive", className }: PulseProps) {
    const showPing = variant === "green" || variant === "blue";

    return (
        <span className={cn(pulseVariants({ variant }), className)}>
            {showPing && (
                <span className={pingVariants({ variant })} />
            )}
            <span className={dotVariants({ variant })} />
        </span>
    );
}
