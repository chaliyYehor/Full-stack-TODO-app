import axios from 'axios'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

api.interceptors.request.use(config => {
	const storedToken = localStorage.getItem('token')
	const token = storedToken ? JSON.parse(storedToken) : null

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})
