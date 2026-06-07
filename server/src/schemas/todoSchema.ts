import z from 'zod'

export const createTaskSchema = z.object({
	title: z.string().min(2, 'Title is too short').max(40, 'Title is too long'),
	priority: z.enum(['Extreme', 'Moderate', 'Low']),
	date: z
		.string()
		.refine(value => value === '' || !Number.isNaN(Date.parse(value)), {
			message: 'Invalid date',
		}),
	taskDescription: z.string().min(5, 'Description is too small').optional(),
})

export type CreateTaskFormType = z.infer<typeof createTaskSchema>
