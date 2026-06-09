import { useLocalStorage } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Dashboard from '../components/main/Dashboard'
import Header from '../components/main/Header'
import Menu from '../components/main/Menu'
import { useGetAllTodos } from '../hooks/useGetAllTodos'
import { FormProvider, useForm } from 'react-hook-form'
import {
	createTaskFormSchema,
	type CreateTaskFormType,
} from '../schemas/createTaskFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'

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
	const { data, isError } = useGetAllTodos()
	useEffect(() => {
		if (isError) {
			saveToken('')
			navigate('/signUp')
		}
	})

	const methods = useForm<CreateTaskFormType>({
		resolver: zodResolver(createTaskFormSchema),
		defaultValues: {
			title: '',
			priority: 'Low',
			taskDescription: '',
			image: undefined,
			date: null,
			status: 'Not Started',
		},
		mode: 'onSubmit',
	})

	return (
		<>
			<Header />
			<div className='container flex w-full'>
				<Menu />
				<FormProvider {...methods}>
					<Outlet />
				</FormProvider>
			</div>
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
