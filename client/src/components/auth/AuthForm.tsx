import { signInFormInputs, signUpFormInputs } from '../../constants/formType'
import Input from './Input'
interface Props {
	authType: 'SignUp' | 'SignIn'
}

export default function AuthForm({ authType }: Props) {
	const formInputs = authType === 'SignUp' ? signUpFormInputs : signInFormInputs

	return (
		<form className='w-full'>
			{formInputs.map((inp, i) => (
				<Input key={i} inpPlaceholder={inp} />
			))}
			<label className='cursor-pointer select-none'><input type="checkbox"/> I agree to all terms</label> <br />
			<button className='regBtn bg-[#FF9090] text-2xl px-10 py-4 my-2 text-white rounded-xl hover:bg-[#f35b5b] active:bg-[#FF9090] transition shadow-xl cursor-pointer'>{authType === 'SignUp' ? 'Register' : 'Login'}</button>
		</form>
	)
}
 