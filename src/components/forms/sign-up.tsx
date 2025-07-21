'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { toast } from '@/components/toast';
import { useRouter } from "next/navigation";
import { Container } from '@/components/container';
import { createAccount } from "@/actions/account";
import { Checkbox } from '@/components/ui/checkbox';
import { capitalize } from '@/lib/strings';

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

    const [showPasswords, setShowPasswords] = useState(false);

    const onSubmit = async (data: FormData) => {
        const result = await createAccount(data);
        if (result.ok) {
            toast({ title: 'Success!', description: 'Account successfully created. You can log in now.' });
            router.push('/login');
        } else {
            console.error("Error:", result.error.message);
            toast({ title: 'Failed to create account', description: capitalize(result.error.message) });
        }
    };

    const validate = () => {
        const username = (value: string): boolean => value.length > 3 && value.length < 30;
        const password = (value: string): boolean => value.length > 7 && value.length < 101;
        return username(watch('username')) &&
            password(watch('password')) &&
            watch('password') === watch('repeat_password');
    };

    return (
        <Container className='p-5'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-center">
                <div className="flex flex-col gap-6 w-72">
                    <div className="flex flex-col gap-2">
                        <Label required>Username</Label>
                        <Input {...register("username")} required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label required>Password</Label>
                        <Input
                            {...register("password")}
                            type={showPasswords ? 'text' : 'password'}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label required>Repeat password</Label>
                        <Input
                            {...register("repeat_password")}
                            type={showPasswords ? 'text' : 'password'}
                            required
                        />
                    </div>

                    <div className="flex flex-row justify-between -mt-2">
                        <div className='flex items-center gap-2'>
                            <Checkbox
                                id='show-passwords'
                                checked={showPasswords}
                                onCheckedChange={() => setShowPasswords(prev => !prev)}
                            />
                            <Label htmlFor="show-passwords" className="cursor-pointer">Show password</Label>
                        </div>
                        {
                            (watch('password') === watch('repeat_password') && watch('password').length > 0) &&
                            <span className='text-green-500 font-medium text-sm'>
                                Matches
                            </span>
                        }
                    </div>

                    <Button className="w-full" type='submit' disabled={!validate()}>
                        SIGN UP
                    </Button>
                </div>
            </form>
        </Container>
    );
}
