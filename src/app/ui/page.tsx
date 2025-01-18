import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col w-fit py-6 px-6 gap-5 rounded-2xl border border-dashed border-purple-500", className)} {...props} />
));

export default function UIKitPage() {
    return <div className="mx-6 flex gap-5">
        <div>
            Button
            <Container>
                <Button className="w-fit" size="sm">Small</Button>
                <Button className="w-fit" size="default">Default</Button>
                <Button className="w-fit" size="lg">Large</Button>
            </Container>
        </div>
    </div>
}