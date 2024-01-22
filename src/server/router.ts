import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { t } from './context';
import { entries, languages } from './routes';

export const router = t.router({ languages, entries });

export type Router = typeof router;

export type RouterInput = inferRouterInputs<Router>;

export type RouterOutput = inferRouterOutputs<Router>;
