import Preview from "@/components/preview";

export default function CodeBlock({ code, language }: { code: string, language: string }) {
    return (
        <Preview markdown={`\`\`\`${language}\n${code}\n\`\`\``} />
    );
}
