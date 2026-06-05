import z from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024

export const createTaskFormSchema = z.object({
	title: z.string().min(2, 'Title is too short').max(40, 'Title is too long'),
	priority: z.enum(['Extreme', 'Moderate', 'Low']),
	taskDescription: z.string().min(5, 'Description is too small').optional(),
	image: z
		.file()
		.refine(file => file.size <= MAX_FILE_SIZE, {
			message: 'Max image size is 5MB',
		})
		.refine(file => file.type.startsWith('image/'), {
			message: 'Only images are allowed',
		})
		.optional(),
})

export type CreateTaskFormType = z.infer<typeof createTaskFormSchema>
