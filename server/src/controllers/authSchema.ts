import z from 'zod'

export const reqBodySchema = z.object({
	name: z.string().min(3).max(50),
	email: z.email(),
	password: z.string().min(6),
})

export type RegisterReqBody = z.infer<typeof reqBodySchema>
