import z from 'zod'

export const createTaskFormSchema = z.object({
	title: z.string().min(2, 'Title is too short').max(40, 'Title is too long'),
	priority: z.enum(['Extreme', 'Moderate', 'Low']),
	taskDescription: z.string().min(5, 'Description is too small'),
	image: z.file(),
})

export type CreateTaskFormType = z.infer<typeof createTaskFormSchema>