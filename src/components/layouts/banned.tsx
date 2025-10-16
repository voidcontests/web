'use client';

import ContentContainer from "@/components/content-container";
import { MessageBox } from "@/components/sections/message-box";

export function BannedLayout() {
    return (
        <ContentContainer>
            <MessageBox variant="error">
                Your account has been banned.
            </MessageBox>
        </ContentContainer>
    );
}
