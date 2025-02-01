import { TonConnectProvider } from "@/components/ton-connect/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";
import { Toaster } from 'sonner';
import "./globals.css";
import { Rubik } from 'next/font/google';

export const metadata: Metadata = {
  title: 'THE VOID*',
  description: 'Avoid a void in your head',
  metadataBase: new URL('https://void.ndbtea.tech'),
};

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <TonConnectProvider>
        <body className={`flex flex-col min-h-dvh antialiased ${rubik.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster closeButton richColors position="bottom-center" toastOptions={{
              className: rubik.className,
              duration: 3000,
              style: {
                borderRadius: "16px",
              }
            }} />
          </ThemeProvider>
        </body>
      </TonConnectProvider>
    </html>
  );
}
