import { useLocalStorage } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Main() {
	const navigate = useNavigate()

	// Check if the user if authorized 1.1
	const [token] = useLocalStorage('token', '')
	useEffect(() => {
		if (!token) {
			navigate('/signUp')
		}
	}, [])

	return <div>Main</div>
}
