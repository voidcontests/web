import { getAccount } from "@/actions/account";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { data: account } = await getAccount();

    if (account.role.name === 'banned') throw new Error('banned');

    return children;
}
