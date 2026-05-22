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
		</form>
	)
}
