import { CreateAccountForm } from "@/components/forms/create-account";
import { Link } from "@/components/ui/link";

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-[12vh]">
            <h1 className="text-xl font-normal">
                Sign up to THE VOID*
            </h1>
            <CreateAccountForm />
            <div>
                Already have an account? <Link href='/login'>Log in</Link>
            </div>
        </div>
    );
}
