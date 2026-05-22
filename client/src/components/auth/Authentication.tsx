import AuthForm from './AuthForm'

interface Props {
	authType: 'SignUp' | 'SignIn'
}

export default function Authentication({ authType }: Props) {
	return (
		<div className='authWrapper rounded-xl w-full min-h-[calc(100dvh-17rem)] bg-white grid grid-cols-2 px-30 py-5'>
			<div className='imgWrapper flex items-end w-90'>
				<img src='/auth/signupPerson.png' alt='person' />
			</div>
			<div className='auth'>
				<h3 className='authHeading'>
					{authType === 'SignUp' ? 'Sign Up' : 'Sign In'}
				</h3>
				<AuthForm authType={authType}/>
				<p className='authPar'>
					{authType === 'SignIn'
						? "Don't have an account? "
						: 'Already have an account? '}
					<a className='text-blue-500 cursor-pointer font-bold hover:border-b-2 border-blue-500'>
						{authType === 'SignIn' ? 'Create One' : 'Sign In'}
					</a>
				</p>
			</div>
		</div>
	)
}
