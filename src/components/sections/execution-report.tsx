import { Code } from "../code";
import { Widget, WidgetContent, WidgetTitle } from "../ui/widget";

export default function ExecutionReport({ result }: { result?: { status: number; stdout: string;  stderr: string } }) {
    if (!result) return;

    return (
        <>
            {
                result.status === 0 &&
                <Widget className="min-w-196 w-fit">
                    <WidgetContent>
                        <WidgetTitle>
                            STDOUT
                        </WidgetTitle>
                        <Code>
                            {result.stdout}
                        </Code>
                    </WidgetContent>
                </Widget>
            }
            {
                result.status !== 0 &&
                <Widget className="min-w-196 w-fit">
                    <WidgetContent>
                        <WidgetTitle>
                            STDERR
                        </WidgetTitle>
                        <Code className="text-scarlet-500">
                            {result.stderr}
                        </Code>
                    </WidgetContent>
                </Widget>
            }
        </>
    );
}
