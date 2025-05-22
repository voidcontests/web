import { getAccount } from "@/actions";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const account = await getAccount();

    if (account.role.name === 'banned') throw new Error('banned');

    return children;
}
