import z from 'zod'

export const registerSchema = z
	.object({
		firstName: z.string().min(2, 'Please provide a valid First Name'),
		lastName: z.string().min(3, 'Please provide a valid Last Name'),
		username: z.string().min(4, 'Username is too short'),
		email: z.email(),
		password: z.string().min(5, 'Password is too short'),
		confirmPassword: z.string().min(5, 'Password is too short'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export type RegisterType = z.infer<typeof registerSchema>

export const loginSchema = z.object({
	username: z.string().min(4, 'Username is too short'),
	password: z.string().min(5, 'Password is too short'),
})

export type LoginType = z.infer<typeof loginSchema>
