import { writable } from 'svelte/store';

export const sourceLanguage = writable<string>('en');
export const targetLanguage = writable<string>('en');
