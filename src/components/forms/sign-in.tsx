'use client';

import { createSession } from '@/actions/account';
import { revalidate } from '@/actions/revalidate';
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { toast } from '@/components/toast';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Container } from '@/components/container';
import { config } from '@/config';

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
            Cookies.set(config.cookies.token_key, response.token);
            revalidate('/');
            router.push('/');
            toast({ title: 'Logged in' });
        } catch (e) {
            console.error("Error:", e);
            toast({ title: 'Something went wrong. Try again later' });
        }
    };

    const validate = () => {
        return watch('username').length > 3 && watch('password').length > 8;
    };

    return (
        <Container className='p-5'>
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
        </Container>
    );
}
