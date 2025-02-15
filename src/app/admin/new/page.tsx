'use client';

import { CreateProblemForm } from '@/components/forms/create-problem';
import ContentContainer from "@/components/content-container";

export default function Page() {
    return (
        <ContentContainer className="max-w-3xl">
            <CreateProblemForm />
        </ContentContainer>
    );
}
