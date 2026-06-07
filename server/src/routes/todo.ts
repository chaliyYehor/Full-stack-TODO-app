import express from 'express'
import { createTodo, upload } from '../controllers/todo.js'

const router = express.Router()

router.post('/create', upload.single('image'), createTodo)

export default router
