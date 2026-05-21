import { NextFunction, Request, Response } from 'express'
import {
	loginReqBodySchema,
	RegisterReqBody,
	reqBodySchema,
} from './authSchema.js'
import { BadRequestError } from '../errors/bad-request.js'
import { StatusCodes } from 'http-status-codes'
import User from '../models/user.js'
import { NotFoundError } from '../errors/not-found.js'
import { UnauthenticatedError } from '../errors/unauthenticated.js'

export const register = async (
	req: Request<{}, {}, RegisterReqBody>,
	res: Response,
	next: NextFunction,
) => {
	const result = reqBodySchema.safeParse(req.body)
	if (!result.success) {
		return next(new BadRequestError('Please provide valid credentials'))
	}

	const user = await User.create(result.data)
	const token = user.createJWT()
	return res
		.status(StatusCodes.CREATED)
		.json({ user: { name: user.name }, token })
}

export const login = async (
	req: Request<{}, {}, Omit<RegisterReqBody, 'name'>>,
	res: Response,
	next: NextFunction,
) => {
	const result = loginReqBodySchema.safeParse(req.body)
	if (!result.success) {
		return next(new BadRequestError('Please provide valid credentials'))
	}
	const { password, email } = req.body

	const user = await User.findOne({ email })
	if (!user) {
		return next(new NotFoundError('No such user was found'))
	}

	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		return next(new UnauthenticatedError('Wrong password'))
	}

	const token = user.createJWT()
	res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}
