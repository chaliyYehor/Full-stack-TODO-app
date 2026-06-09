import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import z from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024

export const editTaskFormSchema = z
	.object({
		title: z
			.string()
			.min(2, 'Title is too short')
			.max(40, 'Title is too long')
			.optional(),
		priority: z.enum(['Extreme', 'Moderate', 'Low']).optional(),
		status: z.enum(['Not Started', 'In Progress', 'Completed']).optional(),
		date: z
			.custom<Dayjs>(value => dayjs.isDayjs(value), {
				message: 'Invalid date',
			})
			.nullable()
			.optional(),
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
	.refine(data => Object.keys(data).length > 0, {
		message: 'You need to change at least one field',
	})

export type EditTaskFormSchema= z.infer<typeof editTaskFormSchema>
