import { CreateAccountForm } from "@/components/forms/create-account";

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-[12vh]">
            <h1 className="text-xl font-normal">
                Sign up to THE VOID*
            </h1>
            <div className="border rounded-xl bg-surface p-5 flex flex-col gap-2 not-dark:shadow-md">
                <CreateAccountForm />
            </div>
        </div>
    );
}
