export async function generateMetadata({ params }: { params: { charcode: string } }) {
    return {
        title: `Problem ${params.charcode.toUpperCase()}`,
    }
}

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
