import z from 'zod'

export const todosSchema = z.array(
	z.object({
		createdAt: z.string(),
		date: z.string(),
		imageUrl: z.string(),
		priority: z.enum(['Extreme', 'Moderate', 'Low']),
		taskDescription: z.string(),
		title: z.string(),
		updatedAt: z.string(),
		_id: z.string(),
	}),
)

export type TodoType = z.infer<typeof todosSchema>
