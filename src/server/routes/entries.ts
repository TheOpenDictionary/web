import { TRPCError } from '@trpc/server';
import { and, inArray } from 'drizzle-orm';
import { z } from 'zod';

import { convertMarkdownFields } from '$server/utils';

import { db } from '../../db/client';
import { dictionaries } from '../../db/schema';
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
		const entry = await db.query.entries.findFirst({
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

		if (!entry) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'This entry could not be found.'
			});
		}

		return convertMarkdownFields(entry);
	});

const search = procedure
	.input(
		z.object({
			term: z.string(),
			language: z.string(),
			target: z.string().default('en')
		})
	)
	.query(async ({ input, ctx }) => {
		const results = await ctx.meilisearch.index('entries').search(input.term, {
			filter: `sourceLanguage = ${input.language} AND targetLanguage = ${input.target}`,
			limit: 4
		});

		return results.hits as { term: string; definitions: string; id: string }[];
	});

export const entries = router({ search, get });
