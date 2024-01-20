import English from '~icons/twemoji/flag-united-states';
import French from '~icons/twemoji/flag-france';
import German from '~icons/twemoji/flag-germany';
import Spanish from '~icons/twemoji/flag-spain';
import Russian from '~icons/twemoji/flag-russia';
import Portuguese from '~icons/twemoji/flag-brazil';
import Italian from '~icons/twemoji/flag-italy';
import Japanese from '~icons/twemoji/flag-japan';
import Chinese from '~icons/twemoji/flag-china';

import type { ComponentType } from 'svelte';

export const FLAGS: Record<string, ComponentType> = {
	en: English,
	fr: French,
	de: German,
	es: Spanish,
	ru: Russian,
	pt: Portuguese,
	it: Italian,
	ja: Japanese,
	zh: Chinese
};
