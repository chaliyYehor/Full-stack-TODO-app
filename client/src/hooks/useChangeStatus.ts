import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeStatus } from '../api/todos.api'

export const useChangeStatus = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: changeStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})
}
