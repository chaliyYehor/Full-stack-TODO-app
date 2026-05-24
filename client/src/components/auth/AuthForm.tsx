import { useForm, useFormContext } from 'react-hook-form'
import { signInFormInputs, signUpFormInputs } from '../../constants/formType'
import Input from './Input'
import {
	loginSchema,
	registerSchema,
	type LoginType,
	type RegisterType,
} from '../../schemas/authFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
interface Props {
	authType: 'SignUp' | 'SignIn'
}

type AuthFormType = RegisterType | LoginType

export default function AuthForm({ authType }: Props) {
	const formInputs = authType === 'SignUp' ? signUpFormInputs : signInFormInputs

	const {
		register,
		handleSubmit,
		resetField,
		formState: { isSubmitting },
	} = useFormContext<AuthFormType>()

	return (
		<form className='w-full'>
			{formInputs.map((inp, i) => (
				<Input key={i} inpPlaceholder={inp} />
			))}
			{authType === 'SignUp' && (
				<>
					<label className='cursor-pointer select-none'>
						<input className='cursor-pointer' type='checkbox' /> I agree to all
						terms
					</label>
					<br />
				</>
			)}
			<button className='regBtn bg-[#FF9090] text-2xl px-10 py-4 my-2 text-white rounded-xl hover:bg-[#f35b5b] active:bg-[#FF9090] transition shadow-xl cursor-pointer'>
				{authType === 'SignUp' ? 'Register' : 'Login'}
			</button>
		</form>
	)
}
