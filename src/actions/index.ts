//
// NOTE:
// if server-action don't use server API like `cookies` from 'next/headers'
// next.js decides to do actual request only once (at build time). it leads to
// kinda 'statical' pages, that are even not marked as static in build logs.
//

import { DOMAIN } from '@/config';

export type ID = string | number;

export const BASEPATH = `${DOMAIN}/api`;
export const COOKIE_KEY = 'token';

export * from './problems';
export * from './contests';
export * from './account';
export * from './revalidate';
