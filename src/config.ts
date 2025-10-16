// TODO: MOVE THIS SHIT OUT OF HERE TO ENV FILE OR KINDA
// I ALWAYS FORGOT TO CHANGE IT FROM LOCALHOST

export const config = {
    api: {
        basepath: 'http://localhost:5919/api', // TODO: Update this on production deploy
    },
    cookies: {
        token_key: 'token',
    },
};
