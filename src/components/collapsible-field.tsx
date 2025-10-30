import { cva, VariantProps } from "class-variance-authority";
import Code from "@/components/code";
import CollapsibleText from "@/components/collapsible-text";

const containerVariants = cva(
    "rounded-xl not-dark:border border-border-secondary",
    {
        variants: {
            variant: {
                default: "bg-surface-secondary p-3",
                error: "bg-scarlet-500/10 py-3 px-4",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const textVariants = cva("block", {
    variants: {
        variant: {
            default: "text-foreground",
            error: "text-scarlet-500",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

const buttonVariants = cva("text-sm transition-colors text-left hover:cursor-pointer", {
    variants: {
        variant: {
            default: "text-tertiary-foreground hover:text-foreground",
            error: "text-scarlet-400 hover:text-scarlet-600 dark:hover:text-scarlet-300",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface ExpandableCodeBlockProps extends VariantProps<typeof containerVariants> {
    label?: string;
    content?: string;
}

export function CollapsibleField({ label, content = '', variant }: ExpandableCodeBlockProps) {
    if (content.trim().length === 0) return null;

    return (
        <div className={containerVariants({ variant })}>
            <div className="flex flex-col gap-2">
                {label && <span className="text-sm text-tertiary-foreground">{label}</span>}
                <CollapsibleText
                    maxLines={10}
                    expandText="show more..."
                    collapseText="show less"
                    buttonClassName={buttonVariants({ variant })}
                >
                    <Code className={textVariants({ variant })}>{content}</Code>
                </CollapsibleText>
            </div>
        </div>
    );
}
