'use client';

import { createSession } from '@/lib/api';
import { Button } from "@/ui/button";
import { Label } from '@/ui/label';
import { Input } from "@/ui/input";
import { useForm } from 'react-hook-form';
import { toast } from '@/components/toast';
import { Container } from '@/containers/default';
import { capitalize } from '@/lib/strings';
import { useSearchParams } from '@/hooks/search-params';
import { useRouter } from 'next/navigation';
import { useAccount } from '@/hooks/use-account';

export interface FormData {
    username: string;
    password: string;
}

export function LoginForm() {
    const { authorized, loading } = useAccount();
    const params = useSearchParams();

    const { register, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = async (data: FormData) => {
        // TODO: redirect out of here, if user already logged in

        const result = await createSession(data);
        if (result.ok) {
            redirectNext();
        } else {
            toast({ title: 'Failed to log in', description: capitalize(result.error.message) });
        }
    };

    const redirectNext = () => {
        // NOTE: used `window.location.href` because we need to reload page to update account button
        const next = params.get('next') ?? '/';
        window.location.href = next;
    }

    const validate = () => {
        const username = (value: string): boolean => {
            return value.length > 3 && value.length < 30;
        }

        const password = (value: string): boolean => {
            return value.length > 7 && value.length < 101;
        }

        return username(watch('username')) && password(watch('password'));
    };

    if (!loading && authorized) {
        redirectNext();
    }

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

                    <Button className="font-medium w-full" type='submit' disabled={!validate()}>SIGN IN</Button>
                </div>
            </form>
        </Container>
    );
}
