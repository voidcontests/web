import { Button } from "@/components/ui/button";
import { Verdict } from "@/components/verdict";
import { cn } from "@/lib/utils";
import React from "react";

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col w-fit py-6 px-6 gap-5 rounded-2xl border border-dashed border-purple-500", className)} {...props} />
));

const Title = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
    <h1 ref={ref} className={cn("text-purple-500", className)} {...props} />
));

export default function UIKitPage() {
    return <div className="mx-6 flex gap-5">
        <div>
            <Title>
                Button
            </Title>
            <Container>
                <Button className="w-fit" size="sm">SMALL</Button>
                <Button className="w-fit" size="default">DEFAULT</Button>
                <Button className="w-fit" size="lg">LARGE</Button>
            </Container>
            <Title>
                Verdict
            </Title>
            <Container>
                <Verdict verdict="OK" />
                <Verdict verdict="WA" />
            </Container>
        </div>
    </div>
}