import z from 'zod'

export const registerSchema = z
	.object({
		firstName: z
			.string()
			.min(2, 'Please provide a valid First Name')
			.optional(),
		lastName: z.string().min(3, 'Please provide a valid Last Name').optional(),
		username: z.string().min(4, 'Username is too short'),
		email: z.email(),
		password: z.string().min(5, 'Password is too short'),
		confirmPassword: z.string().min(5, 'Password is too short'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export type RegisterSchema = z.infer<typeof registerSchema>

