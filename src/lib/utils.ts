import { cx } from 'class-variance-authority';
import type { ClassValue } from 'class-variance-authority/types';
import { twMerge } from 'tailwind-merge';

export function cn(...values: ClassValue[]): string {
	return twMerge(cx(...values));
}
