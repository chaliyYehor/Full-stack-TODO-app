import z from 'zod'

export const reqBodySchema = z.object({
	username: z.string().min(3).max(50),
	email: z.email(),
	password: z.string().min(6),
})

export const loginReqBodySchema = z.object({
	email: z.email(),
	password: z.string().min(6)
})

export type RegisterReqBody = z.infer<typeof reqBodySchema>
