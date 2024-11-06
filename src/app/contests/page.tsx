"use client";

import { useIsConnectionRestored } from "@tonconnect/ui-react";

export default function Contests() {
    const connectionRestored = useIsConnectionRestored();

    if (!connectionRestored) {
        return <div>Please wait...</div>;
    }

    return <>Contests page</>;
}