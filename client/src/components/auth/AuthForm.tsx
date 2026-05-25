import {
	useFormContext,
	type FieldErrors,
	type SubmitHandler,
} from 'react-hook-form'
import { signInFormInputs, signUpFormInputs } from '../../constants/formType'
import Input from './Input'
import type { AuthFormType } from '../../types/types'
import { useRegister } from '../../hooks/useRegister'
import axios from 'axios'
interface Props {
	authType: 'SignUp' | 'SignIn'
}

export default function AuthForm({ authType }: Props) {
	const formInputs = authType === 'SignUp' ? signUpFormInputs : signInFormInputs

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useFormContext<AuthFormType>()

	const { mutateAsync: registerUser } = useRegister()

	const onSubmit: SubmitHandler<AuthFormType> = async data => {
		try {
			const response = await registerUser(data)
			console.log(response)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data?.msg)
				return
			}
		}
	}

	return (
		<form
			className='w-full'
			onSubmit={handleSubmit(onSubmit, (errors: FieldErrors<AuthFormType>) => {
				console.log(errors)
			})}
		>
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
			<button
				type='submit'
				disabled={isSubmitting}
				className='regBtn bg-[#FF9090] text-2xl px-10 py-4 my-2 text-white rounded-xl hover:bg-[#f35b5b] active:bg-[#FF9090] transition shadow-xl cursor-pointer'
			>
				{authType === 'SignUp' ? 'Register' : 'Login'}
			</button>
		</form>
	)
}
