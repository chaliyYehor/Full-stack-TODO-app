import express from 'express'
import { createTodo, getAllTodos, upload } from '../controllers/todo.js'

const router = express.Router()

router.post('/create', upload.single('image'), createTodo)
router.get('/', getAllTodos)

export default router
