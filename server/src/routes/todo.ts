import express from 'express'
import {
	changeTodo,
	createTodo,
	deleteTodo,
	getAllTodos,
	upload,
} from '../controllers/todo.js'

const router = express.Router()

router.post('/create', upload.single('image'), createTodo)
router.patch('/editTodo/:todoId', upload.single('image'), changeTodo)
router.delete('/editTodo/:todoId', deleteTodo)
router.get('/', getAllTodos)

export default router
