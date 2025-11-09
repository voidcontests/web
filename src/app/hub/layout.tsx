import { fetchAccount } from '@/actions/account';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Hub \\ Void',
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const result = await fetchAccount();

    if (!result.ok) {
        redirect('/login?next=/hub');
    }

    return children;
}
