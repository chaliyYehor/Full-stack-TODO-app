import type { UserInfo } from '../schemas/userInfoSchema'
import { api } from './axios'

export const getUserInfo = async (): Promise<UserInfo> => {
	const response = await api.get<UserInfo>('/api/v1/user/me')

	return response.data
}
