import { api } from './axios'

export const getAllTodos = async () => {
	const response = await api.get('/api/v1/todos')

	return response.data
}