import { NextFunction, Request, Response } from 'express'
import { CustomApiError } from '../errors/custom-api.js'
import { MongoServerError } from 'mongodb'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

export const errorHandlerMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (res.headersSent) {
		return next(err)
	}

	if (err instanceof CustomApiError) {
		return res.status(err.statusCode).json({ msg: err.message })
	}

	if (err instanceof MongoServerError && err.code === 11000) {
		console.log(err)
		return res.status(StatusCodes.BAD_REQUEST).json({
			msg: `A user with this email already exists`,
		})
	}

	if (err instanceof mongoose.Error.ValidationError) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			msg: Object.values(err.errors)
				.map(item => item.message)
				.join(', '),
		})
	}

	if (err instanceof mongoose.Error.CastError) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			msg: `No item found with id : ${err.value}`,
		})
	}

	console.error(err)
	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ msg: err.message || 'Something went wrong, try again later' })
}
