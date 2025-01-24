import { TonConnectProvider } from "@/components/ton-connect/provider";
import { Notification } from "@/components/notification";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ChevronRight } from "lucide-react";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Toaster } from 'sonner';
import "./globals.css";

export const metadata: Metadata = {
  title: 'VOID*',
  description: 'Avoid a void in your head'
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = cookies().get('theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <html lang="en">
      <ThemeProvider>
        <TonConnectProvider>
          <body className={`flex flex-col min-h-dvh antialiased ${theme}`}>
            {/* <Notification
              variant="default"
              href="https://github.com/voidcontests/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
            >
              <div>This is an early dev build. Report bugs here</div>
              <ChevronRight className="w-5 h-5" />
            </Notification> */}
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster closeButton richColors theme={theme} position="bottom-center" toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "16px",
                fontFamily: 'Rubik',
              }
            }} />
          </body>
        </TonConnectProvider>
      </ThemeProvider>
    </html>
  );
}
