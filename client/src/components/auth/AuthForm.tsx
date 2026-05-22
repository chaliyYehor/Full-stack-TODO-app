import Input from './Input'

export default function AuthForm() {
	return (
		<form className='w-full'>
			<Input inpPlaceholder='First Name' />
			<Input inpPlaceholder='Last Name' />
			<Input inpPlaceholder='Username' />
			<Input inpPlaceholder='Email' />
			<Input inpPlaceholder='Password' />
			<Input inpPlaceholder='Confirm Password' />
		</form>
	)
}
