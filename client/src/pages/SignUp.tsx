import Authentication from '../components/auth/Authentication'

export default function SignUp() {
	return (
		<div className="signUpWrapper bg-[#FF6767] min-h-dvh w-dvw py-32.5 px-25 overflow-hidden">
			<Authentication authType='SignIn'/>
		</div>
	)
}
