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

export default function Problems() {
  return (
    <div>
      <div className="flex gap-[20px] m-[40px]">
        <div className="flex flex-col gap-[20px]">
          <Toggle variant="default">
            DEFAULT
          </Toggle>
          <Toggle variant="outline">
            OUTLINE
          </Toggle>
          {/* <Button variant="dashed">DASHED BUTTON</Button>
        <Input placeholder="Ima disabled" disabled />
        <Input placeholder="This is a placeholder" />
        <Input value="This is a value + focus" autoFocus /> */}
        </div>

        <Card className="w-[300px]">
          <CardContent>
            <div>
              <Badge variant="green">Onboarding</Badge>
            </div>
            <CardTitle>
              Introduction
            </CardTitle>
            <Separator />
            <div className="flex justify-between">
              <div>Prize pot</div>
              <div>69 TON</div>
            </div>
            <div className="flex justify-between">
              <div>Entry price</div>
              <div>0.5 TON</div>
            </div>
            <Separator />
            <div>
              Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
            </div>
          </CardContent>
          <CardFooter className="pt-[20px]">
            {/* <Button variant="link" className="w-full">
            PAID CONTESTS
          </Button> */}
            <Link href="/hui" size="large">PAID CONTESTS</Link>
          </CardFooter>
        </Card>

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
      <div className="flex gap-[20px] m-[40px]">
        <div className="flex flex-col gap-[20px]">
          <Toggle variant="default">
            DEFAULT
          </Toggle>
          <Toggle variant="outline">
            OUTLINE
          </Toggle>
          {/* <Button variant="dashed">DASHED BUTTON</Button>
        <Input placeholder="Ima disabled" disabled />
        <Input placeholder="This is a placeholder" />
        <Input value="This is a value + focus" autoFocus /> */}
        </div>

        <Card className="w-[300px]">
          <CardContent>
            <div>
              <Badge variant="green">Onboarding</Badge>
            </div>
            <CardTitle>
              Introduction
            </CardTitle>
            <Separator />
            <div className="flex justify-between">
              <div>Prize pot</div>
              <div>69 TON</div>
            </div>
            <div className="flex justify-between">
              <div>Entry price</div>
              <div>0.5 TON</div>
            </div>
            <Separator />
            <div>
              Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
            </div>
          </CardContent>
          <CardFooter className="pt-[20px]">
            {/* <Button variant="link" className="w-full">
            PAID CONTESTS
          </Button> */}
            <Link href="/hui" size="large">PAID CONTESTS</Link>
          </CardFooter>
        </Card>

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
      <div className="flex gap-[20px] m-[40px]">
        <div className="flex flex-col gap-[20px]">
          <Toggle variant="default">
            DEFAULT
          </Toggle>
          <Toggle variant="outline">
            OUTLINE
          </Toggle>
          {/* <Button variant="dashed">DASHED BUTTON</Button>
        <Input placeholder="Ima disabled" disabled />
        <Input placeholder="This is a placeholder" />
        <Input value="This is a value + focus" autoFocus /> */}
        </div>

        <Card className="w-[300px]">
          <CardContent>
            <div>
              <Badge variant="green">Onboarding</Badge>
            </div>
            <CardTitle>
              Introduction
            </CardTitle>
            <Separator />
            <div className="flex justify-between">
              <div>Prize pot</div>
              <div>69 TON</div>
            </div>
            <div className="flex justify-between">
              <div>Entry price</div>
              <div>0.5 TON</div>
            </div>
            <Separator />
            <div>
              Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
            </div>
          </CardContent>
          <CardFooter className="pt-[20px]">
            {/* <Button variant="link" className="w-full">
            PAID CONTESTS
          </Button> */}
            <Link href="/hui" size="large">PAID CONTESTS</Link>
          </CardFooter>
        </Card>

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
      <div className="flex gap-[20px] m-[40px]">
        <div className="flex flex-col gap-[20px]">
          <Toggle variant="default">
            DEFAULT
          </Toggle>
          <Toggle variant="outline">
            OUTLINE
          </Toggle>
          {/* <Button variant="dashed">DASHED BUTTON</Button>
        <Input placeholder="Ima disabled" disabled />
        <Input placeholder="This is a placeholder" />
        <Input value="This is a value + focus" autoFocus /> */}
        </div>

        <Card className="w-[300px]">
          <CardContent>
            <div>
              <Badge variant="green">Onboarding</Badge>
            </div>
            <CardTitle>
              Introduction
            </CardTitle>
            <Separator />
            <div className="flex justify-between">
              <div>Prize pot</div>
              <div>69 TON</div>
            </div>
            <div className="flex justify-between">
              <div>Entry price</div>
              <div>0.5 TON</div>
            </div>
            <Separator />
            <div>
              Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
            </div>
          </CardContent>
          <CardFooter className="pt-[20px]">
            {/* <Button variant="link" className="w-full">
            PAID CONTESTS
          </Button> */}
            <Link href="/hui" size="large">PAID CONTESTS</Link>
          </CardFooter>
        </Card>

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
      <div className="flex gap-[20px] m-[40px]">
        <div className="flex flex-col gap-[20px]">
          <Toggle variant="default">
            DEFAULT
          </Toggle>
          <Toggle variant="outline">
            OUTLINE
          </Toggle>
          {/* <Button variant="dashed">DASHED BUTTON</Button>
        <Input placeholder="Ima disabled" disabled />
        <Input placeholder="This is a placeholder" />
        <Input value="This is a value + focus" autoFocus /> */}
        </div>

        <Card className="w-[300px]">
          <CardContent>
            <div>
              <Badge variant="green">Onboarding</Badge>
            </div>
            <CardTitle>
              Introduction
            </CardTitle>
            <Separator />
            <div className="flex justify-between">
              <div>Prize pot</div>
              <div>69 TON</div>
            </div>
            <div className="flex justify-between">
              <div>Entry price</div>
              <div>0.5 TON</div>
            </div>
            <Separator />
            <div>
              Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
            </div>
          </CardContent>
          <CardFooter className="pt-[20px]">
            {/* <Button variant="link" className="w-full">
            PAID CONTESTS
          </Button> */}
            <Link href="/hui" size="large">PAID CONTESTS</Link>
          </CardFooter>
        </Card>

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
      <div className="flex gap-[20px] m-[40px]">
        <div className="flex flex-col gap-[20px]">
          <Toggle variant="default">
            DEFAULT
          </Toggle>
          <Toggle variant="outline">
            OUTLINE
          </Toggle>
          {/* <Button variant="dashed">DASHED BUTTON</Button>
        <Input placeholder="Ima disabled" disabled />
        <Input placeholder="This is a placeholder" />
        <Input value="This is a value + focus" autoFocus /> */}
        </div>

        <Card className="w-[300px]">
          <CardContent>
            <div>
              <Badge variant="green">Onboarding</Badge>
            </div>
            <CardTitle>
              Introduction
            </CardTitle>
            <Separator />
            <div className="flex justify-between">
              <div>Prize pot</div>
              <div>69 TON</div>
            </div>
            <div className="flex justify-between">
              <div>Entry price</div>
              <div>0.5 TON</div>
            </div>
            <Separator />
            <div>
              Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
            </div>
          </CardContent>
          <CardFooter className="pt-[20px]">
            {/* <Button variant="link" className="w-full">
            PAID CONTESTS
          </Button> */}
            <Link href="/hui" size="large">PAID CONTESTS</Link>
          </CardFooter>
        </Card>

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
      <div className="flex gap-[20px] m-[40px]">
        <div className="flex flex-col gap-[20px]">
          <Toggle variant="default">
            DEFAULT
          </Toggle>
          <Toggle variant="outline">
            OUTLINE
          </Toggle>
          {/* <Button variant="dashed">DASHED BUTTON</Button>
        <Input placeholder="Ima disabled" disabled />
        <Input placeholder="This is a placeholder" />
        <Input value="This is a value + focus" autoFocus /> */}
        </div>

        <Card className="w-[300px]">
          <CardContent>
            <div>
              <Badge variant="green">Onboarding</Badge>
            </div>
            <CardTitle>
              Introduction
            </CardTitle>
            <Separator />
            <div className="flex justify-between">
              <div>Prize pot</div>
              <div>69 TON</div>
            </div>
            <div className="flex justify-between">
              <div>Entry price</div>
              <div>0.5 TON</div>
            </div>
            <Separator />
            <div>
              Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
            </div>
          </CardContent>
          <CardFooter className="pt-[20px]">
            {/* <Button variant="link" className="w-full">
            PAID CONTESTS
          </Button> */}
            <Link href="/hui" size="large">PAID CONTESTS</Link>
          </CardFooter>
        </Card>

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
      <div className="flex gap-[20px] m-[40px]">
        <div className="flex flex-col gap-[20px]">
          <Toggle variant="default">
            DEFAULT
          </Toggle>
          <Toggle variant="outline">
            OUTLINE
          </Toggle>
          {/* <Button variant="dashed">DASHED BUTTON</Button>
        <Input placeholder="Ima disabled" disabled />
        <Input placeholder="This is a placeholder" />
        <Input value="This is a value + focus" autoFocus /> */}
        </div>

        <Card className="w-[300px]">
          <CardContent>
            <div>
              <Badge variant="green">Onboarding</Badge>
            </div>
            <CardTitle>
              Introduction
            </CardTitle>
            <Separator />
            <div className="flex justify-between">
              <div>Prize pot</div>
              <div>69 TON</div>
            </div>
            <div className="flex justify-between">
              <div>Entry price</div>
              <div>0.5 TON</div>
            </div>
            <Separator />
            <div>
              Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
            </div>
          </CardContent>
          <CardFooter className="pt-[20px]">
            {/* <Button variant="link" className="w-full">
            PAID CONTESTS
          </Button> */}
            <Link href="/hui" size="large">PAID CONTESTS</Link>
          </CardFooter>
        </Card>

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
    </div>
  );
}
