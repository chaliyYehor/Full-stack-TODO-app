import { Request, Response } from 'express'

export const getTodos = async (req: Request, res: Response) => {
	res.json({ message: 'get todos' })
}