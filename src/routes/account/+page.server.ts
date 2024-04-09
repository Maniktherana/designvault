import type { Actions, PageServerLoad } from './$types';

import { redirect } from 'sveltekit-flash-message/server';

import { route } from '$lib/ROUTES';
import { deleteSessionCookie, deleteUser } from '$lib/server/authUtils';
import { lucia } from '$lib/server/auth';
import { LOGIN_ROUTE } from '$lib/utils/navLinks';
import { db } from '$lib/server/db';
import { newsletterTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = (async (event) => {
	const { cookies, locals } = event;

	if (!locals.user) {
		throw redirect(
			route('/login'),
			{
				type: 'error',
				message: 'You must be logged in to view the dashboard.'
			},
			cookies
		);
	}

	const isSubscribed = await db
		.select({ isSubscribed: newsletterTable.isSubscribed })
		.from(newsletterTable)
		.where(eq(newsletterTable.email, locals.user.email));

	return {
		loggedInUser: locals.user,
		isSubscribed: isSubscribed[0]?.isSubscribed
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async ({ cookies, locals }) => {
		if (!locals.session?.id) return;

		await lucia.invalidateSession(locals.session.id);

		await deleteSessionCookie(lucia, cookies);

		throw redirect(303, LOGIN_ROUTE);
	},

	deleteUser: async ({ cookies, locals }) => {
		if (!locals.session?.id) return;
		if (locals.user?.id) {
			await lucia.invalidateUserSessions(locals.user.id);
			await deleteSessionCookie(lucia, cookies);
			await deleteUser(locals.user.id);
		}
		throw redirect(303, route('/login'));
	},

	toggleSubscription: async ({ locals }) => {
		if (!locals.user) return;

		const isSubscribed = await db
			.select({ isSubscribed: newsletterTable.isSubscribed })
			.from(newsletterTable)
			.where(eq(newsletterTable.email, locals.user.email));

		if (isSubscribed.length === 0) {
			await db.insert(newsletterTable).values({
				email: locals.user.email,
				createdAt: Date.now(),
				isSubscribed: true
			});

			return { isSubscribed: true };
		} else {
			await db
				.update(newsletterTable)
				.set({ isSubscribed: !isSubscribed[0].isSubscribed })
				.where(eq(newsletterTable.email, locals.user.email));

			return { isSubscribed: !isSubscribed[0].isSubscribed };
		}
	}
};
