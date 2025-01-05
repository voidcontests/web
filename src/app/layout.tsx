import Header from "@/components/header";
import type { Metadata } from "next";
import "./globals.css";
import { TonConnectProvider } from "@/components/ton-connect/provider";
import { Footer } from "@/components/footer";
import { Notification } from "@/components/notification";
import { Bug, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "VOID",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <TonConnectProvider>
        {/* NOTE: there is some weird micro-scroll with 'min-h-screen' */}
        <body className='flex flex-col min-h-[99vh] antialiased'>
          {/* <Notification
            variant="warning"
            href="https://github.com/cascadecontests/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
          >
            <Bug className="w-5 h-5" />
            <div>This is an early development build</div>
            <ChevronRight className="w-5 h-5" />
          </Notification> */}
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </body>
      </TonConnectProvider>
    </html>
  );
}
