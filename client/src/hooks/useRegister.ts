import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../api/auth.api'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			navigate('/')
		}
	})
}
