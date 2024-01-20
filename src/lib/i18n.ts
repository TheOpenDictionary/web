import { type AvailableLanguageTag } from '$i18n/runtime';

/**
 * Look up the text direction for a given locale.
 * You could use a Polyfill for `Intl.Locale.prototype.getTextInfo` instead.
 */
export function getTextDirection(locale: AvailableLanguageTag) {
	const directions: Partial<Record<AvailableLanguageTag, 'ltr' | 'rtl'>> = {};
	return directions[locale] ?? 'ltr';
}
