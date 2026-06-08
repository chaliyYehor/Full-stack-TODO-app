import { api } from './axios'

export const getUserInfo = async () => {
	const response = await api.get('/api/v1/user/me')
	return response.data
}
