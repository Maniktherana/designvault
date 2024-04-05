import { RESEND_API_KEY } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';

import { eq } from 'drizzle-orm';
import { TimeSpan, type Lucia } from 'lucia';
import { createDate, isWithinExpirationDate } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { Resend } from 'resend';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';

import { EMAIL_VERIFICATION_CODE_LENGTH } from '$lib/validators';
import { db } from './db';
import { emailVerificationCodesTable, userTable, type UserInsertSchema } from './schema';

const resend = new Resend(RESEND_API_KEY);

export const GITHUB_OAUTH_STATE_COOKIE_NAME = 'githubOauthState';
export const GOOGLE_OAUTH_STATE_COOKIE_NAME = 'googleOauthState';
export const GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME = 'googleOauthCodeVerifier';

export const PENDING_USER_VERIFICATION_COOKIE_NAME = 'pendingUserVerification';
export type PendingVerificationUserDataType = {
	id: string;
	email: string;
};

type EmailParams = {
	email: string;
	subject: string;
	htmlContent: string;
};

function createRateLimiter(cookieName: string, cookieSecret: string) {
	return new RetryAfterRateLimiter({
		// A rate is defined as [number, unit]
		IP: [10, 'h'], // IP address limiter, allowing up to  10 requests per hour
		IPUA: [5, 'm'], // IP + User Agent limiter, allowing up to  5 requests per minute

		cookie: {
			/* Cookie limiter. This limits the number of requests from the same browser (identified by a unique cookie) to  2 per minute.

			It helps prevent a single browser session from making too many requests in a short time, providing an extra layer of protection against abuse.
		*/
			name: cookieName, // Unique cookie name for this limiter
			secret: cookieSecret,
			rate: [2, 'm'], // Allows up to  2 requests per minute from the same browser session
			preflight: true // Require preflight call (see load function)
		}
	});
}

export const verifyCodeRateLimiter = createRateLimiter(
	'verifyCodeRateLimiterCookieId',
	'verifyCodeRateLimiterCookieSecret'
);

export const sendCodeRateLimiter = createRateLimiter(
	'sendCodeRateLimiterCookieId',
	'sendCodeRateLimiterCookieSecret'
);

export const passwordResetEmailRateLimiter = createRateLimiter(
	'passwordResetEmailRateLimiterCookieId',
	'passwordResetEmailRateLimiterCookieSecret'
);

export const passwordResetPageActionRateLimiter = createRateLimiter(
	'passwordResetPageActionRateLimiterCookieId',
	'passwordResetPageActionRateLimiterCookieSecret'
);

export const passwordResetDashboardPageActionRateLimiter = createRateLimiter(
	'passwordResetDashboardPageActionRateLimiterCookieId',
	'passwordResetDashboardPageActionRateLimiterCookieSecret'
);

export const createAndSetSession = async (lucia: Lucia, userId: string, cookies: Cookies) => {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};

export const deleteSessionCookie = async (lucia: Lucia, cookies: Cookies) => {
	const sessionCookie = lucia.createBlankSessionCookie();

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};

export const checkIfUserExists = async (email: string) => {
	const [existingUser] = await db
		.select({
			id: userTable.id,
			email: userTable.email,
			isEmailVerified: userTable.isEmailVerified
		})
		.from(userTable)
		.where(eq(userTable.email, email));

	return existingUser;
};

export const insertNewUser = async (user: UserInsertSchema) => {
	return await db.insert(userTable).values(user);
};

export const getAllUsers = async () => {
	const queryResult = await db
		.select({
			id: userTable.id,
			name: userTable.name,
			email: userTable.email
		})
		.from(userTable);

	return queryResult;
};

export const deleteAllUsers = async () => {
	return await db.delete(userTable);
};

const sendEmail = async ({ email, subject, htmlContent }: EmailParams) => {
	const { error } = await resend.emails.send({
		from: 'Lucia V3 example <onboarding@resend.dev>',
		to: [email],
		subject,
		html: htmlContent
	});

	if (error) {
		console.error({ error });
		return { success: false, message: `Failed to send email: ${error.message}` };
	}

	return {
		success: true,
		message: `An email has been sent to ${email} with the subject: ${subject}.`
	};
};

export const sendEmailVerificationCode = async (email: string, code: string) => {
	const htmlContent = `
	<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
		<h1>Email Verification</h1>
		<p>Thank you for taking the time to verify your email address. Your verification code is:</p>
		<p style="font-size: 20px;"><strong>${code}</strong></p>
		<p>Please enter this code in the verification field to complete the process. If you did not request this verification, please ignore this email.</p>
	</div>
	`;

	return sendEmail({
		email,
		subject: 'Email Verification Code Request',
		htmlContent
	});
};

export const generateEmailVerificationCode = async (userId: string, email: string) => {
	const code = generateRandomString(EMAIL_VERIFICATION_CODE_LENGTH, alphabet('0-9'));

	// This transaction block ensures atomicity and data integrity. If an error occurs while inserting the new code, the transaction will be rolled back, preventing the deletion of old verification codes. This maintains the state of the db.
	await db.transaction(async (trx) => {
		// Delete any existing verification codes for the user
		await trx
			.delete(emailVerificationCodesTable)
			.where(eq(emailVerificationCodesTable.userId, userId));

		// Insert the new verification code
		await trx.insert(emailVerificationCodesTable).values({
			userId,
			email,
			code,
			expiresAt: createDate(new TimeSpan(5, 'm')) // 5 minutes
		});
	});

	return code;
};

export const verifyEmailVerificationCode = async (userId: string, code: string) => {
	const [verificationCode] = await db
		.select()
		.from(emailVerificationCodesTable)
		.where(eq(emailVerificationCodesTable.userId, userId));

	// If there's no verification code for the user in the db
	if (!verificationCode) {
		return { success: false, message: 'Verification code not found.' };
	}

	// If the provided code doesn't match the one in the db
	if (verificationCode.code !== code) {
		return { success: false, message: 'The provided verification code is incorrect.' };
	}

	// If the verification code has expired
	if (!isWithinExpirationDate(verificationCode.expiresAt)) {
		return {
			success: false,
			message: 'The verification code has expired, please request a new one.'
		};
	}

	// If everything is okay, delete the verification code from the db
	await db
		.delete(emailVerificationCodesTable)
		.where(eq(emailVerificationCodesTable.userId, userId));

	// Return a success message
	return { success: true, message: 'Email verification successful!' };
};