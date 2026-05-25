import type { AuthFormType } from '../types/types'
import { api } from './axios'

export const registerUser = async (data: AuthFormType) => {
	const response = await api.post('/api/v1/auth/register', data)

	return response.data
}