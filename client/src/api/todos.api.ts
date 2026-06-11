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

export const editTodo = async ({
	data,
	taskId,
}: {
	data: FormData
	taskId: string
}) => {
	const response = await api.patch(`/api/v1/todos/editTodo/${taskId}`, data)

	return response.data
}

export const deleteTodo = async ({ taskId }: { taskId: string }) => {
	const response = await api.delete(`/api/v1/todos/deleteTodo/${taskId}`)

	return response.data
}

type ChangeStatusData = {
	data: {status: 'Not Started' | 'In Progress' | 'Completed'}
	taskId: string
}
export const changeStatus = async ({ data, taskId }: ChangeStatusData) => {
	const response = await api.patch(`/api/v1/todos/editStatus/${taskId}`, data)

	return response.data
}
