import { Button } from "@/components/ui/button";
import {
  Widget,
  WidgetContent,
  WidgetTitle,
  WidgetFooter,
} from "@/components/ui/widget";
import Link from "next/link";

export default function Home() {
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
      </div>
    </div>
  );
}
