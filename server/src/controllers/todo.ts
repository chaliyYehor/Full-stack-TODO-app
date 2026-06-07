import { v2 as cloudinary } from 'cloudinary'
import { Request, Response } from 'express'
import multer from 'multer'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

export const upload = multer({dest: 'uploads/'})

export const createTodo = async (req: Request, res: Response) => {
	
}