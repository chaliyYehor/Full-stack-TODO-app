import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors/unauthenticated.js'
import jwt from 'jsonwebtoken'

interface AuthPayload extends JwtPayload {
	userID: string
	username: string
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return next(new UnauthenticatedError('User is not authorized'))
	}
	const token = authHeader.split(' ')[1]
	const jwtSecret = process.env.JWT_SECRET
	if (!jwtSecret) {
		throw new Error('jwt secret is not defined')
	}
	try {
		const payload = jwt.verify(token, jwtSecret) as AuthPayload
		req.user = { userID: payload.userID, username: payload.username }
		next()
	} catch (error) {
		return next(new UnauthenticatedError('Unauthorized'))
	}
}
