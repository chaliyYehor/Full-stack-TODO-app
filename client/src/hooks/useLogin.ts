import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth.api'
import { useLocalStorage } from '@uidotdev/usehooks'

export const useLogin = () => {
	const navigate = useNavigate()
	const [_, saveToken] = useLocalStorage('token', '')

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			saveToken(data.token)
			navigate('/')
		},
	})
}
