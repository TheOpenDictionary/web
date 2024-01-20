import { z } from 'zod';
import { and, inArray } from 'drizzle-orm';

import { db } from '$db/client';
import { dictionaries } from '$db/schema';

import { procedure, router } from '../context';

/* -------------------------------------------------------------------------- */
/*                                   Entries                                  */
/* -------------------------------------------------------------------------- */

const get = procedure
	.input(
		z.object({
			term: z.string(),
			language: z.string(),
			target: z.string().default('en')
		})
	)
	.query(async ({ input }) => {
		const rows = await db.query.entries.findFirst({
			with: {
				dictionary: {
					columns: {
						sourceLanguage: true,
						targetLanguage: true
					}
				},
				etymologies: {
					with: {
						senses: {
							with: {
								definitions: {
									with: {
										examples: true,
										notes: true
									}
								},
								groups: {
									with: {
										definitions: {
											with: {
												examples: true,
												notes: true
											}
										}
									}
								}
							}
						}
					}
				}
			},
			where: ({ term, dictionaryId }, { eq }) =>
				and(
					eq(term, input.term),
					inArray(
						dictionaryId,
						db
							.select({ id: dictionaries.id })
							.from(dictionaries)
							.where(
								and(
									eq(dictionaries.sourceLanguage, input.language),
									eq(dictionaries.targetLanguage, input.target)
								)
							)
					)
				)
		});

		return rows;
	});

export const entries = router({ get });
