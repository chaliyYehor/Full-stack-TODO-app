import { api } from './axios'

export const getUserInfo = async () => {
	const response = await api.get('/api/v1/users/me')
	return response.data
}
