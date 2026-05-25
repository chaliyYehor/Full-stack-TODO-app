import z from 'zod'

export const reqBodySchema = z.object({
	firstName: z.string().min(2, 'Please provide a valid First Name'),
	lastName: z.string().min(3, 'Please provide a valid Last Name'),
	username: z.string().min(3).max(50),
	email: z.email(),
	password: z.string().min(6),
})

export const loginReqBodySchema = z.object({
	username: z.string().min(4, 'Username is too short'),
	password: z.string().min(6),
})

export type RegisterReqBody = z.infer<typeof reqBodySchema>
export type LoginReqBody = z.infer<typeof loginReqBodySchema>
