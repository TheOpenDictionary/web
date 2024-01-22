import { markdownToHTML } from '$lib/markdown';

export async function convertMarkdownFields<T extends Record<string, unknown>>(obj: T): Promise<T> {
	if (!obj) return obj;

	const acc: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(obj)) {
		if (['description', 'value'].includes(key) && typeof value === 'string') {
			acc[key] = await markdownToHTML(value);
		} else if (Array.isArray(value)) {
			acc[key] = await Promise.all(value.map(convertMarkdownFields));
		} else if (typeof value === 'object') {
			acc[key] = await convertMarkdownFields(value as Record<string, unknown>);
		} else {
			acc[key] = value;
		}
	}

	return acc as T;
}
