import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { db } from '$lib/server/db';
import { newsletterTable, postTable } from '$lib/server/schema.js';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(formSchema));
	const posts = await db.select().from(postTable).orderBy(desc(postTable.createdAt)).all();
	return {
		form: form,
		posts: posts
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await db.transaction(async (trx) => {
			// Check if the email already exists
			const [returnedEmail] = await trx
				.select()
				.from(newsletterTable)
				.where(eq(newsletterTable.email, form.data.email));

			if (returnedEmail) {
				if (returnedEmail.isSubscribed) {
					form.valid = false;
					form.message = 'Email already exists';

					return fail(400, {
						form
					});
				} else {
					await trx
						.update(newsletterTable)
						.set({
							isSubscribed: true
						})
						.where(eq(newsletterTable.email, form.data.email));
					form.message = 'You have been resubscribed!';

					return {
						form
					};
				}
			} else {
				await trx.insert(newsletterTable).values({
					email: form.data.email,
					createdAt: Date.now(),
					isSubscribed: true
				});
				form.message = 'You have been subscribed!';

				return {
					form
				};
			}
		});
	}
};
