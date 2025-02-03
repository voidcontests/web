import { Button } from "@/components/ui/button";

export default function UI() {
    return (
        <div>
            <Button variant="default">DEFAULT</Button>
            <Button variant="secondary">SECONDARY</Button>
            <Button variant="destructive">DESTRUCTIVE</Button>
            <Button variant="link">LINK</Button>
            <Button variant="outline">OUTLINE</Button>
            <Button variant="dashed">DASHED</Button>
            <Button variant="ghost">GHOST</Button>
        </div>
    );
}
