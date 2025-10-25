import Preview from "@/components/preview";
import { Container } from "@/containers/default";
import { ContestProblemDetailed } from "@/lib/models";
import { Separator } from "@/ui/separator";

export default function Statement({ problem }: { problem: ContestProblemDetailed }) {
    const points = problem.difficulty === 'easy' ? 1 : problem.difficulty === 'mid' ? 2 : 3;
    return (
        <Container className="py-5 px-7">
            <div className="flex justify-center items-center gap-3 text-center">
                <span className="text-lg">
                    {`${problem.charcode}/ ${problem.title}`}
                </span>
                <span className="text-lg text-secondary-foreground">
                    {`(${points} pts.)`}
                </span>
            </div>
            <Separator className="my-5"/>
            <Preview markdown={problem.statement} />
        </Container>
    );
}
