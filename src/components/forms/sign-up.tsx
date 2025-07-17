'use client';

import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { toast } from '@/components/toast';
import { useRouter } from "next/navigation";
import { Container } from '@/components/container';
import { config } from '@/config';
import { createAccount } from "@/actions/account";

export interface FormData {
    username: string;
    password: string;
    repeat_password: string;
}

export function CreateAccountForm() {
    const router = useRouter();

    const { register, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
            repeat_password: '',
        }
    });

    const onSubmit = async (data: FormData) => {
        const result = await createAccount(data);
        if (result.ok) {
            toast({ title: 'Account created successfully' });
            router.push('/login');
        } else {
            console.error("Error:", result.error);
            toast({ title: 'Something went wrong. Try again later' });
        }
    };

    const validate = () => {
        return watch('username').length > 3 &&
            watch('password').length > 8 &&
            watch('password') === watch('repeat_password');
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

                    <div className="flex flex-col gap-2">
                        <Label required>
                            Repeat password
                        </Label>
                        <Input
                            {...register("repeat_password")}
                            type='password'
                            required
                        />
                    </div>

                    <Button className="w-full" type='submit' disabled={!validate()}>SIGN UP</Button>
                </div>
            </form>
        </Container>
    );
}
