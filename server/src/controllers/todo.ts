import { v2 as cloudinary } from 'cloudinary'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import { createTaskSchema, optionalTaskSchema } from '../schemas/todoSchema.js'
import { BadRequestError } from '../errors/bad-request.js'
import Task from '../models/task.js'
import fs from 'fs/promises'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const upload = multer({ dest: 'uploads/' })

const MAX_FILE_SIZE = 5 * 1024 * 1024

export const createTodo = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const parsed = createTaskSchema.safeParse(req.body)
	if (!parsed.success) {
		return next(new BadRequestError(parsed.error.message))
	}

	const { date, priority, title, taskDescription, status } = parsed.data

	try {
		let imageUrl = ''
		let imagePublicId = ''

		if (req.file) {
			if (req.file.size > MAX_FILE_SIZE) {
				return next(new BadRequestError('Max image size is 5MB'))
			}

			if (!req.file.mimetype.startsWith('image/')) {
				return next(new BadRequestError('Only images are allowed'))
			}

			const result = await cloudinary.uploader.upload(req.file.path, {
				folder: 'todo-tasks',
			})
			imageUrl = result.secure_url
			imagePublicId = result.public_id
		}

		const task = {
			title,
			status,
			priority,
			date,
			taskDescription,
			imageUrl,
			imagePublicId,
			creatorID: req.user?.userID,
		}

		const createTask = await Task.create(task)
		if (!createTask) {
			return next(new BadRequestError('Could not create a task'))
		}

		res.status(StatusCodes.CREATED).json({ msg: 'success', imageUrl })
	} catch (error) {
		next(error)
	} finally {
		if (req.file?.path) {
			await fs.unlink(req.file.path).catch(() => {})
		}
	}
}

export const getAllTodos = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user?.userID) {
			return next(new BadRequestError('User id was not provided'))
		}

		const tasks = await Task.find({ creatorID: req.user.userID })
			.select(['-__v', '-creatorID', '-imagePublicId'])
			.sort({
				createdAt: -1,
			})

		res.status(StatusCodes.OK).json({ tasks })
	} catch (error) {
		next(error)
	}
}

export const changeTodo = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const todoId = req.params.todoId
	const result = optionalTaskSchema.safeParse(req.body)
	if (!result.success) {
		return next(new BadRequestError('Provide valid credentials'))
	}

	try {
		const task = await Task.findOne({
			_id: todoId,
			creatorId: req.user?.userID,
		})

		if (!task) {
			return next(new BadRequestError('Task not found'))
		}

		const updatedData = { ...result.data }

		if (req.file) {
			if (req.file.size > MAX_FILE_SIZE) {
				return next(new BadRequestError('Max image size is 5MB'))
			}

			if (!req.file.mimetype.startsWith('image/')) {
				return next(new BadRequestError('Only images are allowed'))
			}

			const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
				folder: 'todo-tasks',
			})

			if (task.imagePublicId) {
				await cloudinary.uploader.destroy(task.imagePublicId)
			}

			Object.assign(updatedData, {
				imageUrl: uploadedImage.secure_url,
				imagePublicId: uploadedImage.public_id,
			})
		}

		const updatedTask = await Task.findOneAndUpdate(
			{
				_id: todoId,
				creatorID: req.user?.userID,
			},
			updatedData,
			{ new: true, runValidators: true },
		)

		res.status(StatusCodes.OK).json({ task: updatedTask })
	} catch (error) {
		next(error)
	} finally {
		if (req.file?.path) {
			await fs.unlink(req.file.path).catch(() => {})
		}
	}
}
