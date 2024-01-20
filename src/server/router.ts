import { t } from './context';

import { languages, entries } from './routes';

export const router = t.router({ languages, entries });

export type Router = typeof router;
