import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTodo } from '../api/todos.api'

export const useDeleteTodo = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})
}
