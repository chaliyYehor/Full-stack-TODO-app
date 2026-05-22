import AuthForm from './AuthForm'

interface Props {
	authType: 'SignUp' | 'SignIn'
}

export default function Authentication({}: Props) {
	return (
		<div className="authWrapper">
			<div className="imgWrapper">
				<img src="/signupPerson" alt="person" />
			</div>
			<div className="auth">
				<AuthForm />
			</div>
		</div>
	)
}
