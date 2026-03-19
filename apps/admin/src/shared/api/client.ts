import createClient from 'openapi-fetch';
import type { paths } from '../../schema';

const viteApiUrl = import.meta.env.VITE_API_URL;

export const client = createClient<paths>({ baseUrl: viteApiUrl });
