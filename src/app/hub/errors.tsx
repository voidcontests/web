'use client';

import { useEffect } from 'react';
import { MessageBox } from '@/components/sections/message-box';
import ContentContainer from '@/components/content-container';

export default function Error({ error }: { error: Error }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <ContentContainer>
            <MessageBox variant="error">
                {
                    `Error occurred: ${error.message}`
                }
            </MessageBox>
        </ContentContainer>
    );
}
