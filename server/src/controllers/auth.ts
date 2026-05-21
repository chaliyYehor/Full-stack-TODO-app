import { NextFunction, Request, Response } from 'express'
import { RegisterReqBody, reqBodySchema } from './authSchema.js'
import { BadRequestError } from '../errors/bad-request.js'
import { StatusCodes } from 'http-status-codes'

export const register = (
	req: Request<{}, {}, RegisterReqBody>,
	res: Response,
	next: NextFunction,
) => {
	const result = reqBodySchema.safeParse(req.body)
	if (!result.success) {
		return next(new BadRequestError('Please provide valid credentials'))
	}

	res.status(StatusCodes.OK).send(req.body)
}
