import { ProblemDetailed } from "@/api/dto/response";
import { authorized } from "@/api/core/instance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import Preview from "@/components/preview";
import { useState } from "react";
import { toast } from "sonner";

export function ProblemView({ problem }: { problem: ProblemDetailed }) {
    const [answer, setAnswer] = useState('');

    async function submitAnswer() {
        if (answer.trim().length === 0) return;

        if (problem.status === 'accepted') {
            toast.info("Solution for this problem already accepted");
            return;
        }

        const { data, status } = await authorized.post(`/contests/${problem.contest_id}/problems/${problem.id}/submissions`, { answer: answer });

        switch (status) {
            case 201:
                const verdict = data.verdict;
                if (verdict === 'OK') {
                    toast.success('Correct! Answer accepted');
                } else if (verdict === 'WA') {
                    toast.warning('Your answer is incorrect');
                } else {
                    toast.error(`Unknown verdict: ${verdict}`);
                }
                // TODO: re-fetchContest on successfull problem submission
                // fetchContest();
                break;
            case 429:
                toast.warning(`You are submitting too frequently. Wait for ${data.timeout}`);
                break;
            default:
                toast.error('Something went wrong. Try again later');
        }
    }

    return (
        <div className="flex flex-col gap-7">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <Link href={`/contests/${problem.contest_id}`} size="large">
                        BACK TO CONTEST
                    </Link>
                </div>
                <h1 className="text-bright-text text-xl font-medium text-center">
                    {problem.title}
                </h1>
                <div className="flex-1"></div>
            </div>
            <Preview markdown={problem.statement} />
            <div className="flex items-center gap-4">
                <span className="flex-shrink-0 text-sm font-semibold">
                    Answer:
                </span>
                <Input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') submitAnswer();
                    }}
                />
                <Button onClick={submitAnswer} disabled={answer.trim().length === 0}>SUBMIT</Button>
            </div>
        </div>
    );
}