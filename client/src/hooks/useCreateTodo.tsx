import { useMutation } from '@tanstack/react-query'
import { createTodo } from '../api/todos.api'

export const useCreateTodo = () => {
	return useMutation({
		mutationFn: createTodo
	})
}