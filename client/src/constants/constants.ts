import type { CreateTaskFormType } from '../schemas/createTaskFormSchema'

export const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]

export const priorityInputs: CreateTaskFormType['priority'][] = [
	'Extreme',
	'Moderate',
	'Low',
]
