'use client';

import ContentContainer from "@/components/content-container";
import { MessageBox } from "@/components/sections/message-box";

export function UnauthorizedLayout() {
    return (
        <ContentContainer>
            <MessageBox variant="error">
                You have to sign in to have access to creator's hub.
            </MessageBox>
        </ContentContainer>
    );
}
