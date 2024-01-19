import { t } from './context';
import { languages } from './routes';

export const router = t.router({ languages });

export type Router = typeof router;
