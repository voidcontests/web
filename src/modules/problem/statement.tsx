import Preview from "@/components/preview";
import { Container } from "@/containers/default";
import { ContestProblemDetailed, ProblemDetailed } from "@/lib/models";
import { ContestProblemDetailedSchema } from "@/lib/schemas";
import { Separator } from "@/ui/separator";

type StatementProps = {
    problem: ContestProblemDetailed | ProblemDetailed;
};

function isContestProblem(problem: ContestProblemDetailed | ProblemDetailed): problem is ContestProblemDetailed {
    return ContestProblemDetailedSchema.safeParse(problem).success;
}

export default function Statement({ problem }: StatementProps) {
    const points = problem.difficulty === 'easy' ? 1 : problem.difficulty === 'mid' ? 2 : 3;
    const title = isContestProblem(problem)
        ? `${problem.charcode}/ ${problem.title}`
        : `${problem.id}/ ${problem.title}`;

    return (
        <Container className="py-5 px-7">
            <div className="flex justify-center items-center gap-3 text-center">
                <span className="text-lg">
                    {title}
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
