import { TonConnectProvider } from "@/components/ton-connect/provider";
import { ThemeProvider } from "@/contexts/ThemeContext";
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
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <html lang="en">
      <ThemeProvider>
        <TonConnectProvider>
          <body className={`flex flex-col min-h-dvh antialiased ${theme}`}>
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
