import { useLocalStorage } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../components/main/Dashboard'
import Header from '../components/main/Header'
import Menu from '../components/main/Menu'
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
	// const { isError } = useGetAllTodos()
	// useEffect(() => {
	// 	if (isError) {
	// 		saveToken('')
	// 		navigate('/signUp')
	// 	}
	// })

	// const radius = 40
	// const circumference = 2 * Math.PI * radius
	// const percent = 75
	// const offset = circumference - (percent / 100) * circumference

	return (
		<>
			<Header />
			<div className='container flex w-full'>
				<Menu />
				<Dashboard />
			</div>

			{/* <svg width='100' height='100' xmlns='http://www.w3.org/2000/svg'>
				<circle
					strokeWidth='5'
					stroke='lightgray'
					cx='50'
					cy='50'
					r={radius}
					fill='none'
				/>

				<circle
					strokeWidth='5'
					stroke='black'
					cx='50'
					cy='50'
					r={radius}
					fill='none'
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap='round'
				/>
			</svg> */}

			{/* <h1
				className={clsx(
					isLonding && 'loadingComp',
					'relative min-w-[70px] min-h-[25px] overflow-hidden inline-block',
				)}
				style={
					{
						'--left-border': '-250%',
						'--right-border': '200%',
					} as React.CSSProperties
				}
			>
				{isLonding ? '' : 'no lodaing'}
			</h1> */}
		</>
	)
}
