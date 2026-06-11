import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../api/auth.api'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'

export const useRegister = () => {
	const navigate = useNavigate()
	const [_, saveToken] = useLocalStorage('token', '')

	return useMutation({
		mutationFn: registerUser,
		onSuccess: data => {
			saveToken(data.token)
			navigate('/')
		},
	})
}
