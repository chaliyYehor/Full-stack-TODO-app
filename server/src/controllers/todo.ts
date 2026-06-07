import { v2 as cloudinary } from 'cloudinary'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import { createTaskSchema } from '../schemas/todoSchema.js'
import { BadRequestError } from '../errors/bad-request.js'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const upload = multer({ dest: 'uploads/' })

const MAX_FILE_SIZE = 5 * 1024 * 1024

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
	const parsed = createTaskSchema.safeParse(req.body)
	if(!parsed.success) {
		return next(new BadRequestError('Please provide proper credentials'))
	}
	res.status(200).send(req.body)
}
