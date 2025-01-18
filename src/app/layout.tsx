import { TonConnectProvider } from "@/components/ton-connect/provider";
import { Notification } from "@/components/notification";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Bug, ChevronRight } from "lucide-react";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Toaster } from 'sonner';
import "./globals.css";

export const metadata: Metadata = {
  title: "the void*",
  description: 'avoid a void in your head'
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = cookies().get('theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <html lang="en">
      <ThemeProvider>
        <TonConnectProvider>
          <body className={`flex flex-col min-h-[99vh] antialiased ${theme}`}>
            {/* NOTE: there is some weird micro-scroll with 'min-h-screen' */}
            <Notification
              variant="default"
              href="https://github.com/voidcontests/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
            >
              <Bug className="w-5 h-5" />
              <div>This is an early dev build. Report bugs here</div>
              <ChevronRight className="w-5 h-5" />
            </Notification>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Toaster closeButton richColors theme={theme} position="top-right" toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "16px",
                fontFamily: 'Rubik',
              }
            }} />
            <Footer />
          </body>
        </TonConnectProvider>
      </ThemeProvider>
    </html>
  );
}
