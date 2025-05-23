'use client';

import { createSession, revalidate }  from '@/actions';
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { toast } from '@/components/toast';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const COOKIE_KEY = 'token';

export interface FormData {
    username: string;
    password: string;
}

export function LoginForm() {
    const router = useRouter();

    const { register, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = async (data: FormData) => {
        try {
            let response = await createSession(data);
            Cookies.set(COOKIE_KEY, response.token);
            revalidate('/');
            toast({ title: 'Session initiated' });
            router.push('/');
            window.location.reload();
        } catch (e) {
            console.error("Error:", e);
            toast({ title: 'Something went wrong. Try again later' });
        }
    };

    const validate = () => {
        return watch('username').length > 3 && watch('password').length > 8;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-center">
            <div className="flex flex-col gap-6 w-72">
                <div className="flex flex-col gap-2">
                    <Label required>
                        Username
                    </Label>
                    <Input
                        {...register("username")}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label required>
                        Password
                    </Label>
                    <Input
                        {...register("password")}
                        type='password'
                        required
                    />
                </div>

                <Button className="w-full" type='submit' disabled={!validate()}>SIGN IN</Button>
            </div>
        </form>
    );
}
