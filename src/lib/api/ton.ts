import { config } from '@/config';
import { fetchWithAuth, Result } from '@/lib/client';
import z from 'zod';

export type TonProofPayload = {
    address: string;
    network: string;
    proof: {
        timestamp: number;
        domain: {
            lengthBytes: number;
            value: string;
        };
        signature: string;
        payload: string;
        state_init: string;
    };
};

export type Payload = {
    payload: string;
};

const PayloadSchema = z.object({
    payload: z.string(),
});

export async function generatePayload(): Promise<Result<Payload>> {
    return await fetchWithAuth(
        `${config.api.basepath}/tonproof/payload`,
        {
            method: 'POST',
        },
        PayloadSchema
    );
}

export async function checkTonProof(payload: TonProofPayload): Promise<Result<void>> {
    return fetchWithAuth(
        `${config.api.basepath}/tonproof/check`,
        {
            method: 'POST',
            body: JSON.stringify(payload),
        },
        z.void()
    );
}
