import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hub \\ Void',
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
    return children;
}
