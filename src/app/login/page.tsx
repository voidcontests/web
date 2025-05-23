import { Link } from "@/components/ui/link";
import { LoginForm } from "@/components/forms/login";

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-[12vh]">
            <h1 className="text-xl font-normal">
                Sign in to THE VOID*
            </h1>
            <LoginForm />
            <div>
                New here? <Link href='/signup'>Create an account</Link>
            </div>
        </div>
    );
}
