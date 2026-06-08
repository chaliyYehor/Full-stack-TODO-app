import { NextFunction, Request, Response } from 'express'

export const getUserInfo = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res.status(200).send(req.user?.userID)
}
