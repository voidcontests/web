'use client';

import { Button } from "@/components/ui/button";
import Editor from "@/components/editor";
import Markdown from 'react-markdown';
import { useState } from 'react';
import Link from "next/link";
import React from "react";
import {
  Widget,
  WidgetContent,
  WidgetTitle,
  WidgetFooter,
} from "@/components/ui/widget";

const DEFAULT_MD = `### Ima third header
Here is a link for [GitHub](https://github.com)!`;

export default function Home() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);

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
        <Markdown className={'prose'}>
          {markdown}
        </Markdown>
      </div>
    </div>
  );
}