import { TonConnectProvider } from "@/components/ton-connect/provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import type { Metadata } from "next";

import "./globals.css";
import { Notification } from "@/components/notification";
import { Bug, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Cascade :: Home",
  description: "Compete. Win. Improve.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <TonConnectProvider>
        <body className='antialiased'>
          <Notification
            variant="warning"
            href="https://github.com/cascadecontests/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
          >
            <Bug className="w-5 h-5" />
            <div>This is an early development build</div>
            <ChevronRight className="w-5 h-5" />
          </Notification>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </TonConnectProvider>
    </html>
  );
}
