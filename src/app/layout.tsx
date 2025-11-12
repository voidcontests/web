import { ThemeProvider } from "@/components/layout/theme-provider";
import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { TonConnectProvider } from "@/components/ton-connect/provider";
import { Toaster } from 'sonner';

import { Rubik } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: 'Home \\ Void',
    description: 'Avoid a void in your head',
    metadataBase: new URL('https://void.ndbtea.tech'),
};

const rubik = Rubik({
    subsets: ['latin'],
    display: 'swap',
    preload: true,
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`flex flex-col min-h-dvh antialiased ${rubik.className}`}>
                <TonConnectProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <Header />
                        <main className="grow">
                            {children}
                        </main>
                        <Footer />
                        <Toaster position="bottom-right" toastOptions={{
                            className: rubik.className,
                            duration: 5000,
                            style: {
                                borderRadius: "16px",
                            },
                        }} />
                    </ThemeProvider>
                </TonConnectProvider>
            </body>
        </html>
    );
}
