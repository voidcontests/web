import { CreateAccountForm } from "@/components/forms/sign-up";
import { Link } from "@/components/ui/link";

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-[12vh]">
            <h1 className="text-xl font-normal">
                Create an account
            </h1>
            <CreateAccountForm />
            <div>
                Already have an account? <Link href='/login'>Log in</Link>
            </div>
        </div>
    );
}
