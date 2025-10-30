import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

const ContentContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
    <div className="flex justify-center" ref={ref} {...props}>
        <div className={cn("max-w-7xl w-full px-4 flex flex-col gap-5", className)}>
            {children}
        </div>
    </div>
));
ContentContainer.displayName = "ContentContainer";

export default ContentContainer;
