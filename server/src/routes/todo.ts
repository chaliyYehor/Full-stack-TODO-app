import express from 'express'
import { getTodos } from '../controllers/todo.js'

const router = express.Router()

router.get('/', getTodos)

export default router