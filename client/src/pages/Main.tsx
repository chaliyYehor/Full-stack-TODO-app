import { useLocalStorage } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAllTodos } from '../hooks/useGetAllTodos'

export default function Main() {
	const navigate = useNavigate()
	const [_, saveToken] = useLocalStorage('token', '')

	// Check if the user is authorized 1.1
	const [token] = useLocalStorage('token', '')
	useEffect(() => {
		if (!token) {
			saveToken('')
			navigate('/signUp')
		}
	})
	// Check if the user is authorized 1.2
	const { data, isPending, isError } = useGetAllTodos()
	useEffect(() => {
		if (isError) {
			saveToken('')
			navigate('/signUp')
		}
	})

	function logOut() {
		saveToken('')
		navigate('/signUp')
	}

	return (
		<>
			<p>{isPending ? 'pending' : data.message}</p>
			<button className='cursor-pointer' onClick={logOut}>LogOut</button>
		</>
	)
}
