import { BellRing, Check } from "lucide-react"
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import {
  Widget,
  WidgetContent,
  WidgetTitle,
  WidgetFooter,
} from "@/components/ui/widget";
import {
  Card, CardContent, CardTitle, CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle";

export default function ContestsPage() {
  return (
    <div className="flex gap-[20px] m-[40px]">
      <Widget className="w-[380px]">
        <WidgetContent>
          <WidgetTitle>WIN & EARN</WidgetTitle>
          <p>
            <b>VOID</b> - place where you can participate in special events.
            Some contests have no entry price, but still have some prize pot.
            But wait, is money the main thing..?
          </p>
        </WidgetContent>
        <WidgetFooter className="pt-[20px]">
          <Button variant="link" className="w-full">
            PAID CONTESTS
          </Button>
        </WidgetFooter>
      </Widget>
    </div >
  );
}
