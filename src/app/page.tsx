'use client';

import { Button } from "@/components/ui/button";
import Editor from "@/components/editor";
import { useState } from 'react';
import Link from "next/link";
import React from "react";
import {
  Widget,
  WidgetContent,
  WidgetTitle,
  WidgetFooter,
} from "@/components/ui/widget";
import { marked } from "marked";
import dompurify from "dompurify";
import Preview from "@/components/preview";

const DEFAULT_MD = `This is an \`inline code block\`

And a link [here](https://github.com/voidcontests)`;

export default function Home() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);

  const parsed = marked.parse(markdown);
  let sanitized: string = '';
  if (parsed instanceof Promise) {
    parsed.then((val) => {
      sanitized = dompurify.sanitize(val);
    });
  } else {
    sanitized = dompurify.sanitize(parsed);
  }

  return (
    <div className="flex justify-center">
      <div className="w-[1200px] flex flex-col gap-[20px]">
        <Widget className="w-[380px]">
          <WidgetContent>
            <WidgetTitle>HOST</WidgetTitle>
            <p>
              Contests provided by <b>VOID</b> are not only what you can do here.
              Looking for a place for hosting your own competition? You just found it
            </p>
          </WidgetContent>
          <WidgetFooter className="pt-[20px]">
            <Button variant="link" className="w-full" asChild>
              <Link href='/contests/create'>
                CREATE CONTEST
              </Link>
            </Button>
          </WidgetFooter>
        </Widget>
        <Editor value={markdown} onChange={(e) => setMarkdown(e.target.value)}>
          Add a description
        </Editor>
        <Preview markdown={sanitized} />
      </div>
    </div>
  );
}