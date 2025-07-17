import ContentContainer from "@/components/content-container";
import Features from "@/components/sections/features";
import React from "react";

export default async function HomePage() {
    return (
        <ContentContainer className="items-center">
            <div className="flex flex-col items-center gap-8 max-sm:gap-6 mb-12 max-sm:mb-6">
                <h1 className="flex flex-col items-center gap-2 mt-12 max-sm:mt-3 text-7xl max-sm:text-4xl max-md:text-5xl text-center">
                    <span>
                        Easy to host
                    </span>
                    <span className="text-blue-400">
                        Fast to dub dub dub
                    </span>
                </h1>
                <p className="text-center text-lg max-sm:text-sm max-md:text-base max-w-140">
                    Open-source coding contests platform. <br />
                    Create your own competition, participate in existing ones and please your inner ludoman.
                </p>
            </div>
            <Features />
        </ContentContainer>
  );
}
