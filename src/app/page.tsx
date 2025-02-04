import ContentContainer from "@/components/content-container";
import { Button } from "@/components/ui/button";
import Features from "@/components/features";
import NextLink from "next/link";
import React from "react";

export default async function HomePage() {
    return (
        <ContentContainer className="items-center">
            <div className="flex flex-col items-center gap-8 mb-12">
                <h1 className="flex flex-col items-center gap-2 mt-12">
                    <span className="text-7xl">
                        Easy to host
                    </span>
                    <span className="text-7xl text-blue-400">
                        Fast to dub dub dub
                    </span>
                </h1>
                <p className="text-center text-lg max-w-140">
                    Open-source coding contests platform. <br />
                    Create your own competition, participate in existing ones and please your inner ludoman.
                </p>
                <div className="flex gap-5">
                <Button size="lg" asChild>
                    <NextLink href="/contests">
                    EXPLORE
                    </NextLink>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <NextLink href="/create">
                    CREATE
                    </NextLink>
                </Button>
                </div>
            </div>
            <Features />
        </ContentContainer>
  );
}
