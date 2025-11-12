// NOTE: `revalidate` extracted to separate file, to always be called on the server

'use server';

import { revalidatePath } from "next/cache";

export async function revalidate(path: string) {
    revalidatePath(path);
}
