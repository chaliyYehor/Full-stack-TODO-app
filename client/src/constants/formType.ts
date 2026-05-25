export const signUpFormInputs = [
	'First Name',
	'Last Name',
	'Username',
	'Email',
	'Password',
	'Confirm Password',
] as const

export const signInFormInputs = ['Username', 'Password'] as const

export const defineFormInputType = {
	'First Name': 'firstName',
	'Last Name': 'lastName',
	Username: 'username',
	Email: 'email',
	Password: 'password',
	'Confirm Password': 'confirmPassword',
} as const
