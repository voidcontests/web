import { getAccount } from "@/actions/actions";
import { MessageBox } from "@/components/message-box";

export default async function HubMessage() {
    const account = await getAccount();

    if (account.role.name === 'admin') {
        return (
            <MessageBox>
                <span className='font-medium'>
                    YOU HAVE GOD DAMN ADMIN RIGHTS
                </span>
                <span>
                    For now, admin rights are just you have no limitations on
                    creating contests. But maybe in future, it going to have more sense
                </span>
            </MessageBox>
        );
    }

    if (account.role.name === 'banned') {
        return (
            <MessageBox variant='error'>
                <span className='font-medium'>
                    BANNED
                </span>
                <span>
                    Probably, you have been banned from creating contests and problems for acting against the admins' will.
                </span>
            </MessageBox>
        );
    }

    if (account.role.name === 'limited') {
        return (
            <MessageBox variant="warning">
                <span className='font-medium'>
                    LIMITED MODE
                </span>
                <span>
                    {`You are in kinda limited mode. You can create up to ${account.role.created_contests_limit} contests and ${account.role.created_problems_limit} problems.
                    I didn't figured out how to upgrade limitations yet, so for now just enjoy
                    this situation or contact me somewhere`}
                </span>
            </MessageBox>
        );
    }
}
