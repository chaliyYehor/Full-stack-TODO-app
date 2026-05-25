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
import { useState } from 'react'
interface Props {
	authType: 'SignUp' | 'SignIn'
}

export default function AuthForm({ authType }: Props) {
	const formInputs = authType === 'SignUp' ? signUpFormInputs : signInFormInputs

	const [authError, setAuthError] = useState()

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useFormContext<AuthFormType>()

	const { mutateAsync: registerUser } = useRegister()

	const onSubmit: SubmitHandler<AuthFormType> = async data => {
		const {confirmPassword, ...rest} = data
		try {
			const response = await registerUser(rest)
			console.log(response)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setAuthError(error.response?.data?.msg)
				return
			}
		}
	}

	return (
		<form
			className='w-full relative'
			onSubmit={handleSubmit(onSubmit)}
		>
			{formInputs.map((inp, i) => (
				<Input key={i} inpPlaceholder={inp} />
			))}

			<button
				type='submit'
				disabled={isSubmitting}
				className='regBtn bg-[#FF9090] text-2xl px-10 py-4 mt-2 mb-6 text-white rounded-xl hover:bg-[#f35b5b] active:bg-[#FF9090] transition shadow-xl cursor-pointer'
			>
				{authType === 'SignUp' ? 'Register' : 'Login'}
			</button>
			{authError && (
				<p className='text-red-500 text-sm m-0 p-0 absolute bottom-0'>
					{authError}
				</p>
			)}
		</form>
	)
}
