import { Eye, EyeOff, X } from 'lucide-react'
import { useState } from 'react'

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
			imgUrl = '/auth/formIcons/Username.png'
			break
		case 'Email':
			imgUrl = '/auth/formIcons/Email.png'
			break
		case 'Password':
			imgUrl = '/auth/formIcons/Password.png'
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
		<div className='inputWrapper focus-within:ring-2 focus-within:ring-[#ff6767] select-none relative flex justify-center items-center gap-2 border-2 border-[#565454] rounded-lg py-2 px-1 mb-5.5 mt-5'>
			<img className='w-15%' src={imgUrl} alt='icon' />
			<input
				className=' w-full outline-none'
				type={inputType}
				value={input}
				onChange={e => {
					setInput(e.target.value)
				}}
				placeholder={
					inpPlaceholder.startsWith('Confirm')
						? inpPlaceholder
						: `Enter ${inpPlaceholder}`
				}
			/>
			{input.length > 0 && (
				<X onClick={() => setInput('')} className='cursor-pointer' />
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
		</div>
	)
}
