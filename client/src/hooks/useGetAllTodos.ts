import { useQuery } from '@tanstack/react-query'
import { getAllTodos } from '../api/todos.api'

export const useGetAllTodos = () => {
	return useQuery({
		queryFn: getAllTodos,
		queryKey: ['todos']
	})
}