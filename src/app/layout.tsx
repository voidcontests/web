import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/sections/footer";
import Header from "@/components/sections/header";
import type { Metadata } from "next";
import { Toaster } from 'sonner';
import "./globals.css";
import { Rubik } from 'next/font/google';
import { ChevronRight, Egg } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'THE VOID*',
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
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {/* Global notification */}
                    <Link href="https://github.com/voidcontests/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=" target="_blank" rel="noopener noreferrer">
                        <div className="h-10 dark:bg-amber-400 not-dark:bg-amber-300 text-zinc-950 flex justify-center items-center gap-2">
                            <Egg className="size-5" />
                            <span className="text-base">
                                This is an early development build. You can report bugs here
                            </span>
                            <ChevronRight className="size-5" />
                        </div>
                    </Link>
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
            </body>
        </html>
    );
}
