import z from 'zod'

export const userInfoSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	username: z.string(),
})

export type UserInfo = z.infer<typeof userInfoSchema>
