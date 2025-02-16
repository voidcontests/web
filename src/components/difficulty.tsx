import { capitalize } from "@/lib/strings";
import { Tag } from "./ui/tag";

type DifficultyColorMap = {
    [key: string]: 'green' | 'orange' | 'red';
};

const difficultyToBadgeType: DifficultyColorMap = {
    'easy': 'green',
    'mid': 'orange',
    'hard': 'red',
}

export default function Difficulty({ difficulty }: { difficulty: string }) {
    if (!(difficulty in difficultyToBadgeType)) {
        return <Tag>{capitalize(difficulty)}</Tag>
    }

    return (
        <Tag variant={difficultyToBadgeType[difficulty]}>{capitalize(difficulty)}</Tag>
    );
}
