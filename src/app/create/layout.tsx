import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Lobby :: THE VOID*',
};

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
