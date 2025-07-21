import { getAccount } from "@/actions/account";
import { BannedLayout } from "@/components/layouts/banned";
import { UnauthorizedLayout } from "@/components/layouts/unauthorized";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const result = await getAccount();

    if (!result.ok) {
        return <UnauthorizedLayout />;
    }

    const account = result.data;
    if (account.role.name === 'banned') {
        return <BannedLayout />;
    }

    return children;
}
