import { useMutation } from '@tanstack/react-query'
import { deleteTodo } from '../api/todos.api'

export const useDeleteTodo = () => {
	return useMutation({ mutationFn: deleteTodo })
}
