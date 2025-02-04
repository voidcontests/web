import * as React from "react";
import { Tag } from "./ui/tag";
import { capitalize } from "@/lib/strings";

export interface SolvedTagProps extends React.HTMLAttributes<HTMLDivElement> {
    state: 'accepted' | 'tried' | undefined;
}

type StateMap = {
    [key: string]: 'green' | 'orange';
};

const state_tag_color: StateMap = {
    'accepted': 'green',
    'tried': 'orange',
}

function SolvedTag({ className, state, ...props }: SolvedTagProps) {
    if (state === undefined) {
        return (
            <></>
        )
    }

    return (
        <Tag variant={state_tag_color[state]} className={className} {...props}>
            {capitalize(state)}
        </Tag>
    );
}

export { SolvedTag }
