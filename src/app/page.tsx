import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import NextLink from "next/link";
import React from "react";
import {
  Widget,
  WidgetContent,
  WidgetTitle,
  WidgetFooter,
} from "@/components/ui/widget";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-[1200px] flex flex-col gap-[20px]">
        <div className="flex flex-col items-center w-full pt-8 gap-[30px]">
          <h1 className="flex flex-col items-center">
            <span className="font-bold text-[96px] leading-[90px] text-text-primary bg-gradient-to-r from-[#7b84ff] to-[#2d83ec] text-transparent bg-clip-text">
              the void*
            </span>
            <span className="font-normal text-[64px] leading-[75px] text-text-primary">
              avoid the void in your head
            </span>
          </h1>
          <p className="text-center text-[20px]">
            An open-source platform for <b>creating</b>, <b>hosting</b> <br />
            and <b>participating</b> in programming contests
          </p>
          <div className="flex gap-[20px]">
            <Button className="min-w-[150px]" asChild>
              <NextLink href="/contests">
                EXPLORE
              </NextLink>
            </Button>
            <Button variant="outline" className="min-w-[150px]" asChild>
              <NextLink href="/contests/create">
                CREATE
              </NextLink>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <h3 className="font-bold text-[28px]">
            Explore
          </h3>
          <div className="flex gap-[20px]">
            <Widget className="flex-1">
              <WidgetContent>
                <WidgetTitle>WIN & EARN</WidgetTitle>
                <p>
                  <b>THE VOID*</b> - place where you can participate in special events. Some contests have no entry price, but still have some prize pot
                </p>
              </WidgetContent>
              <WidgetFooter className="pt-[20px]">
                <Link href='/contests' size="large">
                  EXPLORE
                </Link>
              </WidgetFooter>
            </Widget>

            <Widget className="flex-1">
              <WidgetContent>
                <WidgetTitle>CREATE</WidgetTitle>
                <p>
                  Our contests are not only what you can do here.
                  Looking for a place for hosting your own competition? You just found it
                </p>
              </WidgetContent>
              <WidgetFooter className="pt-[20px]">
                <Link href='/contests/create' size="large">
                  CREATE
                </Link>
              </WidgetFooter>
            </Widget>

            <Widget className="flex-1">
              <WidgetContent>
                <WidgetTitle>TRAININGS</WidgetTitle>
                <p>
                  Embark on a journey to elevate your expertise!
                  Dive into <b>training rounds</b> tailored to enhance your performance in both free mode and competitive mode.
                </p>
              </WidgetContent>
              <WidgetFooter className="pt-[20px]">
                <Link href='/contests?filters=training' size="large">
                  TRAININGS
                </Link>
              </WidgetFooter>
            </Widget>
          </div>
        </div>
      </div>
    </div>
  );
}