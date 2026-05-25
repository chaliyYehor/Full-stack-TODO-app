import { NextFunction, Request, Response } from 'express'
import {
	LoginReqBody,
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
		.json({ user: { username: user.username }, token })
}

export const login = async (
	req: Request<{}, {}, LoginReqBody>,
	res: Response,
	next: NextFunction,
) => {
	const result = loginReqBodySchema.safeParse(req.body)
	if (!result.success) {
		return next(new BadRequestError('Please provide valid credentials'))
	}
	const { password, username } = req.body

	const user = await User.findOne({ username })
	if (!user) {
		return next(new NotFoundError('No such user was found'))
	}

	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		return next(new UnauthenticatedError('Wrong password'))
	}

	const token = user.createJWT()
	res.status(StatusCodes.OK).json({ user: { username: user.username }, token })
}
