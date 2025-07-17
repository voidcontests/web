import { getAccount } from "@/actions/account";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const result = await getAccount();

    if (!result.ok) {
        throw new Error('unauthorized');
    }

    const account = result.data;
    if (account.role.name === 'banned') throw new Error('banned');

    return children;
}
