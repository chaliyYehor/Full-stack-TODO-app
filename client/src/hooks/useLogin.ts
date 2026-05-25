import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth.api'

export const useLogin = () => {
	const navigate = useNavigate()
	return useMutation({
		mutationFn: loginUser,
		onSuccess: () => {
			navigate('/')
		},
	})
}
