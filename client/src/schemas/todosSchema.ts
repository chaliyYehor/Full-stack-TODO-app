import z from 'zod'

export const todoSchema = z.object({
	createdAt: z.string(),
	date: z.string(),
	imageUrl: z.string(),
	priority: z.enum(['Extreme', 'Moderate', 'Low']),
	status: z.enum(['Not Started', 'In Progress', 'Completed']),
	taskDescription: z.string(),
	title: z.string(),
	updatedAt: z.string(),
	_id: z.string(),
})
export const todosSchema = z.array(todoSchema)

export type TodoType = z.infer<typeof todoSchema>
export type TodosType = z.infer<typeof todosSchema>
