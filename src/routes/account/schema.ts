import { z } from 'zod';

export const formSchema = z.object({
	name: z.string(),
	imageUrl: z.string(),
	videoUrl: z.string(),
	mainTag: z.string(),
	tags: z.array(z.number())
});

export type FormSchema = typeof formSchema;
