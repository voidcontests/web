import Preview from "@/components/sections/preview";

export function CodeBlock({ code, language }: { code: string, language: string }) {
    return (
        <Preview markdown={`\`\`\`${language}\n${code}\n\`\`\``} />
    );
}
