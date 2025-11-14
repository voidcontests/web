import { cn } from "@/lib/utils";

interface UsernameProps {
    username: string;
    className?: string;
    withAt?: boolean;
}

export function Username({ username, className, withAt = true }: UsernameProps) {
    return (
        <span className={cn("inline max-w-[100px] truncate align-middle", className)}>
            {withAt ? `@${username}` : username}
        </span>
    );
}
