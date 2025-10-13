'use client';

import { createSession } from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { toast } from '@/components/toast';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Container } from '@/components/container';
import { config } from '@/config';
import { capitalize } from '@/lib/strings';

export interface FormData {
    username: string;
    password: string;
}

export function LoginForm() {
    const { register, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = async (data: FormData) => {
        const result = await createSession(data);
        if (result.ok) {
            // Token is already set by createSession
            window.location.href = '/';
        } else {
            toast({ title: 'Failed to log in', description: capitalize(result.error.message) });
        }
    };

    const validate = () => {
        const username = (value: string): boolean => {
            return value.length > 3 && value.length < 30;
        }

        const password = (value: string): boolean => {
            return value.length > 7 && value.length < 101;
        }

        return username(watch('username')) && password(watch('password'));
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
