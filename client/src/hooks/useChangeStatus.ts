import { useMutation } from '@tanstack/react-query'
import { changeStatus } from '../api/todos.api'

export const useChangeStatus = () => {
	return useMutation({
		mutationFn: changeStatus,
	})
}
