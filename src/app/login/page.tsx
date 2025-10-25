import { LoginForm } from "@/forms/login";
import { Link } from "@/ui/link";

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-[12vh]">
            <h1 className="text-xl font-normal">
                Dive into the void
            </h1>
            <LoginForm />
            <div>
                New here? <Link href='/create-account'>Create an account</Link>
            </div>
        </div>
    );
}
