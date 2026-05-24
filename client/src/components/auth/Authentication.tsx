import { Link } from 'react-router-dom'
import AuthForm from './AuthForm'

interface Props {
	authType: 'SignUp' | 'SignIn'
}

export default function Authentication({ authType }: Props) {
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
					gap: authType === 'SignIn' ? '50px' : '0px'
				}}
				className='auth flex flex-col'
			>
				<h3 className='authHeading'>
					{authType === 'SignUp' ? 'Sign Up' : 'Sign In'}
				</h3>
				<AuthForm authType={authType} />
				<p className='authPar'>
					{authType === 'SignIn'
						? "Don't have an account? "
						: 'Already have an account? '}
					<Link to={authType === 'SignUp' ? '/signIn' : '/signUp'} className='text-blue-500 cursor-pointer font-bold hover:border-b-2 border-blue-500'>
						{authType === 'SignIn' ? 'Create One' : 'Sign In'}
					</Link>
				</p>
			</div>
		</div>
	)
}
