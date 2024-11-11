import { TonConnectProvider } from "@/components/TonConnectProvider";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Notification } from "@/components/Notification";
import AlertTriangle from "@/icons/AlertTriangle";

export const metadata: Metadata = {
  title: "CIIM: Contests",
  description: "Host and participate in programming contests",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <TonConnectProvider>
        <body>
          <Notification
            type="warning"
            label="This is an early development build. But still be as strict as possible about bugs and not implemented things"
            link="https://github.com/jus1d/ciim/bug-report"
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
