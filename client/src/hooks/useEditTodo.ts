import { useMutation } from '@tanstack/react-query'
import { editTodo } from '../api/todos.api'

export const useEditTodo = () => {
	return useMutation({
		mutationFn: editTodo
	})
}