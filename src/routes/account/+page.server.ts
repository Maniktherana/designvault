import type { Actions, PageServerLoad } from './$types';

import { redirect } from 'sveltekit-flash-message/server';

import { route } from '$lib/ROUTES';
import { deleteSessionCookie, getAllUsers, deleteUser } from '$lib/server/authUtils';
import { lucia } from '$lib/server/auth';
import { LOGIN_ROUTE } from '$lib/utils/navLinks';

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

	return {
		loggedInUser: locals.user,
		allUsers: await getAllUsers()
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
	}
};
