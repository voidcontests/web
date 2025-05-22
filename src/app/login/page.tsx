import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextArea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/ui/link";

export default function Login() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-[12vh]">
            <h1 className="text-xl font-normal">
                Sign in to THE VOID*
            </h1>
            <div className="border rounded-xl bg-surface p-5 flex flex-col gap-2 not-dark:shadow-md">
                <form className="flex flex-col gap-6 items-center">
                    <div className="flex flex-col gap-6 w-72">
                        <div className="flex flex-col gap-2">
                            <Label required>
                                Username
                            </Label>
                            <Input
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label required>
                                Password
                            </Label>
                            <Input
                                type="password"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end w-full">
                        <Button className='w-full' type='submit'>Sign in</Button>
                    </div>
                </form>
            </div>
            <div>
                New here? <Link href='/register'>Create an account</Link>
            </div>
        </div>
    );
}
