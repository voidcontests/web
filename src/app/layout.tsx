import type { Metadata } from "next";
import { TonConnectProvider } from "@/components/TonConnectProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Notification } from "@/components/Notification";
import AlertTriangle from "@/icons/AlertTriangle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cascade",
  description: "Host and participate in programming contests",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <TonConnectProvider>
        <body>
          <Notification
            type="warning"
            label="This is an early development build. But still be as strict as possible about any bugs and not implemented things"
            link="https://github.com/cascadecontests/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
            icon={<AlertTriangle />}
          />
          <Header />
          {children}
          <Footer />
        </body>
      </TonConnectProvider>
    </html>
  );
}
