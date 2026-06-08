import { NextFunction, Request, Response } from 'express'
import User from '../models/user.js'
import { BadRequestError } from '../errors/bad-request.js'
import { StatusCodes } from 'http-status-codes'

export const getUserInfo = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = await User.findOne({ _id: req.user?.userID }).select([
		'firstName',
		'lastName',
		'email',
		'username',
		'-_id',
	])

	if (!user) {
		return next(new BadRequestError('No user was found'))
	}

	res.status(StatusCodes.OK).json(user)
}
