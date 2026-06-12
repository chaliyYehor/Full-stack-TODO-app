import { Eye, EyeOff, X } from 'lucide-react'
import { useState } from 'react'
import { useFormContext, useFormState } from 'react-hook-form'
import { defineFormInputType } from '../../constants/formType'
import type { AuthFormType } from '../../types/types'
import clsx from 'clsx'

interface Props {
	inpPlaceholder:
		| 'Username'
		| 'Email'
		| 'Password'
		| 'Confirm Password'
		| 'First Name'
		| 'Last Name'
}

export default function Input({ inpPlaceholder }: Props) {
	const [input, setInput] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const { register, resetField, control } = useFormContext<AuthFormType>()

	const fieldName = defineFormInputType[inpPlaceholder]
	const { errors } = useFormState({ control, name: fieldName })
	const errorMessage = errors[fieldName]?.message

	let inpType = null
	if (inpPlaceholder.startsWith('Confirm') || inpPlaceholder === 'Password') {
		inpType = 'password'
	} else if (inpPlaceholder === 'Email') {
		inpType = 'email'
	} else {
		inpType = 'text'
	}
	const isPasswordInput = inpType === 'password'
	const inputType = isPasswordInput && showPassword ? 'text' : inpType

	let imgUrl = null
	switch (inpPlaceholder) {
		case 'Username':
			imgUrl = '/auth/formIcons/username.png'
			break
		case 'Email':
			imgUrl = '/auth/formIcons/email.png'
			break
		case 'Password':
			imgUrl = '/auth/formIcons/password.png'
			break
		case 'Confirm Password':
			imgUrl = '/auth/formIcons/confirm.png'
			break
		case 'First Name':
			imgUrl = '/auth/formIcons/firstName.png'
			break
		case 'Last Name':
			imgUrl = '/auth/formIcons/lastName.png'
			break
	}

	return (
		<>
			<div
				className={clsx(
					'inputWrapper focus-within:ring-2 select-none relative flex justify-center items-center gap-2 border-2 border-[#565454] focus-within:ring-[#6776ff] rounded-lg py-2 px-1 mb-5.5 mt-5',
					errorMessage ? 'ring-2 ring-red-500' : 'ring-0',
				)}
			>
				<img className='w-15%' src={imgUrl} alt='icon' />
				<input
					className=' w-full outline-none'
					{...register(defineFormInputType[inpPlaceholder])}
					type={inputType}
					placeholder={
						inpPlaceholder.startsWith('Confirm')
							? inpPlaceholder
							: `Enter ${inpPlaceholder}`
					}
				/>
				{input.length > 0 && (
					<X
						onClick={() => {
							resetField(defineFormInputType[inpPlaceholder])
							setInput('')
						}}
						className='cursor-pointer'
					/>
				)}
				{isPasswordInput && !showPassword && input.length > 0 && (
					<Eye
						onClick={() => setShowPassword(true)}
						className='absolute -right-8'
					/>
				)}
				{isPasswordInput && showPassword && input.length > 0 && (
					<EyeOff
						onClick={() => setShowPassword(false)}
						className='absolute -right-8'
					/>
				)}
				{errorMessage && (
					<p className='text-red-500 text-sm m-0 p-0 absolute left-0 -bottom-5.5'>
						{errorMessage}
					</p>
				)}
			</div>
		</>
	)
}
