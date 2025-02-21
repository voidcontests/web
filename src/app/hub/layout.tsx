import { getAccount } from "@/actions/actions";
import ContentContainer from "@/components/content-container";
import { MessageBox } from "@/components/message-box";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Hub - THE VOID*',
};

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    try {
        const account = await getAccount();

        if (account.role.name === 'banned') {
            return (
                <ContentContainer>
                    <MessageBox variant='error'>
                        <span>
                            You are banned and have no access to creator's hub.
                        </span>
                    </MessageBox>
                </ContentContainer>
            );
        }
    }
    catch (e) {
        return (
            <ContentContainer>
                <MessageBox variant='error'>
                    <span>
                        You need to connect wallet to have access to creator's hub.
                    </span>
                </MessageBox>
            </ContentContainer>
        );
    }

    return children;
}
