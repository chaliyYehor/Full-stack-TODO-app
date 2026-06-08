import type { TodosType } from '../schemas/todosSchema'
import { api } from './axios'

export const getAllTodos = async (): Promise<TodosType> => {
	const response = await api.get('/api/v1/todos')

	return response.data.tasks
}

export const createTodo = async (data: FormData) => {
	const response = await api.post('/api/v1/todos/create', data)

	return response.data
}
