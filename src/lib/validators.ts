import { z } from 'zod';

export const MAX_EMAIL_LENGTH = 254;
export const EMAIL_VERIFICATION_CODE_LENGTH = 8;

const EMAIL_MAX_ERROR_MESSAGE = `Email must be less than ${MAX_EMAIL_LENGTH} characters long`;

export const emailZodSchema = z.string().email().max(MAX_EMAIL_LENGTH, EMAIL_MAX_ERROR_MESSAGE);

export const EmailVerificationCodeZodSchema = z.object({
	verificationCode: z.string().length(EMAIL_VERIFICATION_CODE_LENGTH)
});
