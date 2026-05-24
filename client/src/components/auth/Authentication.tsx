import { Link } from 'react-router-dom'
import AuthForm from './AuthForm'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	loginSchema,
	registerSchema,
} from '../../schemas/authFormSchema'
import type { AuthFormType } from '../../types/types'

interface Props {
	authType: 'SignUp' | 'SignIn'
}

export default function Authentication({ authType }: Props) {
	const schema = authType === 'SignUp' ? registerSchema : loginSchema

	const methods = useForm<AuthFormType>({
		resolver: zodResolver(schema),
		defaultValues: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onSubmit'
	})

	return (
		<div className='authWrapper rounded-xl w-full min-h-[calc(100dvh-17rem)] bg-white grid grid-cols-2 px-30 py-5'>
			<div
				style={{
					gridColumn: authType === 'SignIn' ? 2 : 1,
					gridRow: 1,
					width: authType === 'SignIn' ? '120%' : '90%',
				}}
				className='imgWrapper flex items-end'
			>
				<img
					src={
						authType === 'SignUp'
							? '/auth/signupPerson.png'
							: '/auth/signinPerson.png'
					}
					alt='person'
				/>
			</div>
			<div
				style={{
					gridColumn: authType === 'SignIn' ? 1 : 2,
					gridRow: 1,
					alignSelf: authType === 'SignIn' ? 'center' : 'start',
					gap: authType === 'SignIn' ? '50px' : '0px',
				}}
				className='auth flex flex-col'
			>
				<h3 className='authHeading'>
					{authType === 'SignUp' ? 'Sign Up' : 'Sign In'}
				</h3>
				<FormProvider {...methods}>
					<AuthForm authType={authType} />
				</FormProvider>
				<p className='authPar'>
					{authType === 'SignIn'
						? "Don't have an account? "
						: 'Already have an account? '}
					<Link
						to={authType === 'SignUp' ? '/signIn' : '/signUp'}
						className='text-blue-500 cursor-pointer font-bold hover:border-b-2 border-blue-500'
					>
						{authType === 'SignIn' ? 'Create One' : 'Sign In'}
					</Link>
				</p>
			</div>
		</div>
	)
}
