import { z } from 'zod';

import { db } from '$db/client';

import { procedure, router } from '../context';

/* -------------------------------------------------------------------------- */
/*                                    List                                    */
/* -------------------------------------------------------------------------- */

const list = procedure
	.input(
		z.union([
			z.object({
				sourceLanguage: z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/)
			}),
			z.object({
				targetLanguage: z.string().regex(/^[a-z]{2}(-[A-Z]{2})?$/)
			})
		])
	)
	.query(async ({ input }) => {
		const rows = await db.query.dictionaries.findMany({
			columns: {
				sourceLanguage: true,
				targetLanguage: true
			},
			where: ({ sourceLanguage, targetLanguage }, { eq }) =>
				'sourceLanguage' in input
					? eq(sourceLanguage, input.sourceLanguage)
					: eq(targetLanguage, input.targetLanguage)
		});

		return rows.map(({ targetLanguage, sourceLanguage }) =>
			'sourceLanguage' in input ? targetLanguage : sourceLanguage
		);
	});

export const languages = router({ list });
