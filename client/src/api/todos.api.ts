import { api } from './axios'

export const getAllTodos = async () => {
	const response = await api.get('/api/v1/todos')

	return response.data
}

export const createTodo = async (data: FormData) => {
	const response = await api.post('/api/v1/todos/create', data)

	return response.data
}
