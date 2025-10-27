export const config = {
    api: {
        // TODO: use a domain name later (when deployed)
        basepath: process.env.NEXT_PUBLIC_API_BASEPATH || 'https://contests.fckn.engineer/api',
    },
    cookies: {
        token_key: 'token',
    },
};
