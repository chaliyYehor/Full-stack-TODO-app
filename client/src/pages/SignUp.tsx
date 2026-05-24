import Authentication from '../components/auth/Authentication'

export default function SignUp() {
	return (
		<div className="signInUpWrapper bg-[#FF6767] min-h-dvh w-dvw py-30 px-25 overflow-hidden">
			<Authentication authType='SignUp'/>
		</div>
	)
}
