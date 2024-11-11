import { TonConnectProvider } from "@/components/TonConnectProvider";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "CIIM - Contests",
  description: "Host and participate in programming contests",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <TonConnectProvider>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </TonConnectProvider>
    </html>
  );
}
